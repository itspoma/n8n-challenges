# Alien language guide

Use this exact guide for Challenge 7. The guide is deliberately small and deterministic so mentors can verify every result.

## Dictionary

| Alien word | English word |
| --- | --- |
| `mira` | hello |
| `sava` | friend |
| `nalo` | from |
| `vela` | Valencia |
| `tori` | we |
| `luma` | arrive |
| `piko` | peacefully |
| `nexa` | today |
| `doro` | bring |
| `fena` | music |

The dictionary is authoritative. Do not infer or invent meanings for words that are absent from it.

## Translation rules

1. Inputs are space-separated alien words without punctuation. Match dictionary words without regard to uppercase or lowercase letters.
2. Translate known words in their original order. Capitalize the first English word and finish the sentence with a period.
3. Keep each unknown word unchanged and place square brackets around it in `translation`.
4. Put every unknown-word occurrence in `unknownWords`, preserving its spelling, order, and duplicates. Return an empty array when every word is known.
5. Set `confidence` to `100 - (30 × number of unknown-word occurrences)`, with a minimum of `0`. The value must be an integer from 0 to 100.
6. Return exactly three fields: `translation` as a string, `confidence` as an integer, and `unknownWords` as an array of strings.

## Official test messages

### Known message

Input:

```text
mira sava nalo vela
```

Expected result:

```json
{
  "translation": "Hello friend from Valencia.",
  "confidence": 100,
  "unknownWords": []
}
```

### Mystery message

Input:

```text
mira zorb nalo vela
```

Expected result:

```json
{
  "translation": "Hello [zorb] from Valencia.",
  "confidence": 70,
  "unknownWords": ["zorb"]
}
```

## Bonus back-translation rule

The bonus workflow uses a second AI step to translate the English result back into alien words. For comparison, convert known English words through the reverse dictionary, unwrap bracketed unknown words, lowercase the text, remove punctuation, and collapse repeated spaces. Compare this normalized result with the normalized original alien message.

- If the two normalized messages match, keep the original confidence.
- If they differ, subtract 20 more points from confidence, with a minimum of 0.
- Keep `translation` and `unknownWords` unchanged, and return the same three-field structure.
