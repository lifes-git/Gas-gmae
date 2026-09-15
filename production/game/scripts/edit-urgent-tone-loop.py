import argparse
import wave
from pathlib import Path

import numpy as np


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--count", type=int, choices=(2, 3), required=True)
    args = parser.parse_args()

    with wave.open(str(args.source), "rb") as reader:
        channels = reader.getnchannels()
        width = reader.getsampwidth()
        rate = reader.getframerate()
        frames = reader.readframes(reader.getnframes())

    if width != 2:
        raise ValueError("Expected 16-bit PCM WAV")

    audio = np.frombuffer(frames, dtype="<i2").reshape(-1, channels).astype(np.float64)
    pulse_length = round(rate * .30)
    source_spacing = round(rate * .375)
    output_spacing = round(rate * .68)
    fade_length = round(rate * .012)
    output_length = output_spacing * (args.count - 1) + pulse_length + round(rate * .08)
    output = np.zeros((output_length, channels), dtype=np.float64)

    for index in range(args.count):
        pulse = audio[index * source_spacing:index * source_spacing + pulse_length].copy()
        pulse[:fade_length] *= np.linspace(0, 1, fade_length)[:, None]
        pulse[-fade_length:] *= np.linspace(1, 0, fade_length)[:, None]
        start = index * output_spacing
        output[start:start + pulse_length] += pulse * (.9 - index * .06)

    peak = np.max(np.abs(output))
    if peak > 30000:
        output *= 30000 / peak
    pcm = np.clip(output, -32768, 32767).astype("<i2").tobytes()

    args.destination.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(args.destination), "wb") as writer:
        writer.setnchannels(channels)
        writer.setsampwidth(width)
        writer.setframerate(rate)
        writer.writeframes(pcm)


if __name__ == "__main__":
    main()
