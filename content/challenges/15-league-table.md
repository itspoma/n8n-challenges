---
number: 15
slug: league-table
collection: more
difficulty: intermediate
time: 30–45 min
complexity: 3
color: #fffdf6
ink: #1b2427
---

# Solution Data

Internal reference for the solution viewer. This section is not displayed on the challenge page.

## Core Workflow JSON (without bonus)

```json
{
  "name": "Build the League Table – Core",
  "nodes": [
    {
      "parameters": {},
      "id": "d482e93b-6a0b-570a-ae74-4a998194dc5a",
      "name": "Start",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/premier-league-2024-25.json",
        "options": {}
      },
      "id": "f92a1d9d-566f-5903-9dc1-991fe413818d",
      "name": "Get the season's results",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        0
      ],
      "notesInFlow": true,
      "notes": "A copy of openfootball's public-domain file. Other leagues: github.com/openfootball/football.json"
    },
    {
      "parameters": {
        "fieldToSplitOut": "matches",
        "options": {}
      },
      "id": "a40b3f49-5b4a-52c2-af86-5198e3b1d88f",
      "name": "One item per match",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        480,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "60115466-b813-5e67-bc48-32d0451ba10a",
              "name": "team",
              "value": "={{ $json.team1 }}",
              "type": "string"
            },
            {
              "id": "949e5117-548b-58ef-93e6-761cf650f30b",
              "name": "goals_for",
              "value": "={{ $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "36aed4a8-e927-592e-984e-7e8288da6740",
              "name": "goals_against",
              "value": "={{ $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "062aaa2f-4758-5cf8-9230-845bf138bdc1",
              "name": "goal_difference",
              "value": "={{ $json.score.ft[0] - $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "895485c0-e175-59c0-96db-80aa0fed86b2",
              "name": "points",
              "value": "={{ $json.score.ft[0] > $json.score.ft[1] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "87c9698d-a94a-5274-a366-ce4754dc184f",
      "name": "Home team row",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        -140
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "374b4a9c-b865-5f8c-acd8-cb4f2420e857",
              "name": "team",
              "value": "={{ $json.team2 }}",
              "type": "string"
            },
            {
              "id": "44909dae-b337-5685-9c04-dfe8f5507dec",
              "name": "goals_for",
              "value": "={{ $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "8599edab-4798-53e0-8508-5d4482a73b91",
              "name": "goals_against",
              "value": "={{ $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "8e3fe733-a2c4-5f3b-941a-ff174085b3ee",
              "name": "goal_difference",
              "value": "={{ $json.score.ft[1] - $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "3fc6944d-a933-5898-b7e3-2098b686f8a2",
              "name": "points",
              "value": "={{ $json.score.ft[1] > $json.score.ft[0] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "ba03ba94-a4e8-5d68-9c3c-4fcb8a32f985",
      "name": "Away team row",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        720,
        140
      ]
    },
    {
      "parameters": {
        "mode": "append",
        "numberInputs": 2
      },
      "id": "3c19ef43-a62e-5eb0-85fb-808989437099",
      "name": "Both rows together",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "count",
              "field": "team"
            },
            {
              "aggregation": "sum",
              "field": "points"
            },
            {
              "aggregation": "sum",
              "field": "goal_difference"
            },
            {
              "aggregation": "sum",
              "field": "goals_for"
            },
            {
              "aggregation": "sum",
              "field": "goals_against"
            }
          ]
        },
        "fieldsToSplitBy": "team",
        "options": {}
      },
      "id": "bdf9c1c1-0e03-51a5-82a6-9251a4fb2c0a",
      "name": "Add up each team",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        1200,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "sum_points",
              "order": "descending"
            },
            {
              "fieldName": "sum_goal_difference",
              "order": "descending"
            },
            {
              "fieldName": "sum_goals_for",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "dbe800a0-8074-58bb-b72a-494c78998328",
      "name": "Best first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "e319cc16-7254-503b-83c9-c345ad2b440d",
              "name": "position",
              "value": "={{ $itemIndex + 1 }}",
              "type": "number"
            },
            {
              "id": "837020aa-304b-5115-9eda-5255cf5004fa",
              "name": "team",
              "value": "={{ $json.team }}",
              "type": "string"
            },
            {
              "id": "8b258af9-177f-509b-8ab6-7b079483aae9",
              "name": "played",
              "value": "={{ $json.count_team }}",
              "type": "number"
            },
            {
              "id": "ba66f5e1-2bac-5305-a052-87bcfb091d16",
              "name": "points",
              "value": "={{ $json.sum_points }}",
              "type": "number"
            },
            {
              "id": "db284a97-0f65-5e4b-901d-79247cf43ffb",
              "name": "goal_difference",
              "value": "={{ $json.sum_goal_difference }}",
              "type": "number"
            },
            {
              "id": "7e48f1f1-e157-5f16-a550-12c8e485a638",
              "name": "goals_for",
              "value": "={{ $json.sum_goals_for }}",
              "type": "number"
            },
            {
              "id": "e12edeb8-56e0-5239-a458-360ece7bf198",
              "name": "goals_against",
              "value": "={{ $json.sum_goals_against }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "71d51b4e-3a87-56ff-9489-3053f6887082",
      "name": "Number the positions",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1680,
        0
      ]
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "Get the season's results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the season's results": {
      "main": [
        [
          {
            "node": "One item per match",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per match": {
      "main": [
        [
          {
            "node": "Home team row",
            "type": "main",
            "index": 0
          },
          {
            "node": "Away team row",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Home team row": {
      "main": [
        [
          {
            "node": "Both rows together",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Away team row": {
      "main": [
        [
          {
            "node": "Both rows together",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Both rows together": {
      "main": [
        [
          {
            "node": "Add up each team",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Add up each team": {
      "main": [
        [
          {
            "node": "Best first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Best first": {
      "main": [
        [
          {
            "node": "Number the positions",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "pinData": {}
}
```

## Bonus Workflow JSON

```json
{
  "name": "Build the League Table – Bonus",
  "nodes": [
    {
      "parameters": {},
      "id": "0a0bfd8e-8961-5afb-a239-7378740ddc6a",
      "name": "Start",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "61f56116-4be3-5ed2-9869-57eda9054ced",
              "name": "cutoff",
              "value": "2024-12-25",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "49c2d4d2-5e8f-5d5e-8b0d-3a2065032133",
      "name": "Choose the date",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        240,
        0
      ]
    },
    {
      "parameters": {
        "url": "https://n8n-challenges.app/fixtures/premier-league-2024-25.json",
        "options": {}
      },
      "id": "1d6a181f-19f0-5458-b3b6-fa1946c461d1",
      "name": "Get the season's results",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        480,
        0
      ],
      "notesInFlow": true,
      "notes": "A copy of openfootball's public-domain file. Other leagues: github.com/openfootball/football.json"
    },
    {
      "parameters": {
        "fieldToSplitOut": "matches",
        "options": {}
      },
      "id": "160bdb71-ecc7-526e-a5b4-69240110e576",
      "name": "One item per match",
      "type": "n8n-nodes-base.splitOut",
      "typeVersion": 1,
      "position": [
        720,
        0
      ]
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "7f7f795a-b6df-500e-8a33-0ca23e915953",
              "leftValue": "={{ $json.date }}",
              "rightValue": "={{ $('Choose the date').first().json.cutoff }}",
              "operator": {
                "type": "dateTime",
                "operation": "beforeOrEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "id": "040f39b2-b762-580f-9a4a-1207e085b833",
      "name": "Played by the date",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 2.2,
      "position": [
        960,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "7e0f53bd-9fe7-5918-98ef-a774652cad7d",
              "name": "team",
              "value": "={{ $json.team1 }}",
              "type": "string"
            },
            {
              "id": "b6158b4f-f15e-5f63-bf49-15b3edc8a1e8",
              "name": "goals_for",
              "value": "={{ $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "3703da14-7ed5-5b48-a121-47b41198b2f5",
              "name": "goals_against",
              "value": "={{ $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "f75bb934-7f53-5adc-a9d6-e35d3c731a0b",
              "name": "goal_difference",
              "value": "={{ $json.score.ft[0] - $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "46cb4ca1-59a8-5b82-a33f-640f2c71e582",
              "name": "points",
              "value": "={{ $json.score.ft[0] > $json.score.ft[1] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "0e61af21-e81e-584c-bbde-db34428b3b5b",
      "name": "Home team row",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        -140
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "9f822049-e1ec-55f8-ac96-6e7692faab93",
              "name": "team",
              "value": "={{ $json.team2 }}",
              "type": "string"
            },
            {
              "id": "08c6860a-495d-5a6f-b32c-103531cc5a01",
              "name": "goals_for",
              "value": "={{ $json.score.ft[1] }}",
              "type": "number"
            },
            {
              "id": "378f25e0-cca5-53b4-850a-03c5149e4ddf",
              "name": "goals_against",
              "value": "={{ $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "ae48234b-7ece-5370-a633-b8655de54a63",
              "name": "goal_difference",
              "value": "={{ $json.score.ft[1] - $json.score.ft[0] }}",
              "type": "number"
            },
            {
              "id": "a40451c4-da70-5333-9523-5d8f71c3d05a",
              "name": "points",
              "value": "={{ $json.score.ft[1] > $json.score.ft[0] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "930fe0a7-0458-528b-95cf-318494a97ea0",
      "name": "Away team row",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        1200,
        140
      ]
    },
    {
      "parameters": {
        "mode": "append",
        "numberInputs": 2
      },
      "id": "a2715d51-5fa5-5d3b-bd72-28bac7e65ebe",
      "name": "Both rows together",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 3.2,
      "position": [
        1440,
        0
      ]
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "count",
              "field": "team"
            },
            {
              "aggregation": "sum",
              "field": "points"
            },
            {
              "aggregation": "sum",
              "field": "goal_difference"
            },
            {
              "aggregation": "sum",
              "field": "goals_for"
            },
            {
              "aggregation": "sum",
              "field": "goals_against"
            }
          ]
        },
        "fieldsToSplitBy": "team",
        "options": {}
      },
      "id": "b10fba4d-d7d6-57ac-baa0-50706cd517f9",
      "name": "Add up each team",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1.1,
      "position": [
        1680,
        0
      ]
    },
    {
      "parameters": {
        "sortFieldsUi": {
          "sortField": [
            {
              "fieldName": "sum_points",
              "order": "descending"
            },
            {
              "fieldName": "sum_goal_difference",
              "order": "descending"
            },
            {
              "fieldName": "sum_goals_for",
              "order": "descending"
            }
          ]
        },
        "options": {}
      },
      "id": "349991e7-adfe-51d0-9aac-2229ecb39b6c",
      "name": "Best first",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [
        1920,
        0
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "84193a7a-e85b-5248-a5df-934407a114e5",
              "name": "position",
              "value": "={{ $itemIndex + 1 }}",
              "type": "number"
            },
            {
              "id": "e52d1f47-6eba-5668-b0a5-73f0390a35d1",
              "name": "team",
              "value": "={{ $json.team }}",
              "type": "string"
            },
            {
              "id": "9a579be0-acb8-5fa7-8360-cb4fe6e22cc7",
              "name": "played",
              "value": "={{ $json.count_team }}",
              "type": "number"
            },
            {
              "id": "5f3a72fc-ac9a-5ed1-b1b8-892aba6938b0",
              "name": "points",
              "value": "={{ $json.sum_points }}",
              "type": "number"
            },
            {
              "id": "d8ff79cb-ed20-5732-b62e-f27557ba8a91",
              "name": "goal_difference",
              "value": "={{ $json.sum_goal_difference }}",
              "type": "number"
            },
            {
              "id": "4b59217c-8891-5e32-9025-39369fec20b9",
              "name": "goals_for",
              "value": "={{ $json.sum_goals_for }}",
              "type": "number"
            },
            {
              "id": "4114e9f3-7b58-517d-a6aa-e42e853d3cd3",
              "name": "goals_against",
              "value": "={{ $json.sum_goals_against }}",
              "type": "number"
            }
          ]
        },
        "options": {}
      },
      "id": "866de949-64bb-5b27-8f76-a75266943610",
      "name": "Number the positions",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        2160,
        0
      ]
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "Choose the date",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Choose the date": {
      "main": [
        [
          {
            "node": "Get the season's results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get the season's results": {
      "main": [
        [
          {
            "node": "One item per match",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "One item per match": {
      "main": [
        [
          {
            "node": "Played by the date",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Played by the date": {
      "main": [
        [
          {
            "node": "Home team row",
            "type": "main",
            "index": 0
          },
          {
            "node": "Away team row",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Home team row": {
      "main": [
        [
          {
            "node": "Both rows together",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Away team row": {
      "main": [
        [
          {
            "node": "Both rows together",
            "type": "main",
            "index": 1
          }
        ]
      ]
    },
    "Both rows together": {
      "main": [
        [
          {
            "node": "Add up each team",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Add up each team": {
      "main": [
        [
          {
            "node": "Best first",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Best first": {
      "main": [
        [
          {
            "node": "Number the positions",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "pinData": {}
}
```

# English

## Title
Build the League Table

## Summary
Rebuild last season's final Premier League table from all 380 results – and check it against the real one.

## Concept
Reshaping records with two branches, Merge (append), Summarize and Sort with tie-breakers

## Glossary
- goal difference: Goals scored minus goals conceded over the season. When two teams have the same points, the better goal difference ranks higher.
- tie-breakers: The extra rules that decide the order when teams have equal points – first goal difference, then goals scored.
- Append mode: The Merge setting that simply puts the items from both inputs one after the other, without matching them.
- data file: A JSON file that programs can read: here, one object per match with the teams, the date and the full-time score.

## Scenario
- A five-a-side league that publishes its own standings from a results sheet.
- A sports newsletter that recalculates the table the moment the weekend's scores come in.
- Any report that adds up events per person, product or team – sales per rep, tickets per agent.

## Task
Here are all 380 results of the 2024–25 Premier League season as one data file. Rebuild the final table: one row per team with games played, points, goal difference and goals scored, in the right order from champion to last place.

## Bonus Task
Make the table work for any date you choose – for example, show how it stood on Christmas Day 2024 – without changing anything else.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- Edit Fields (Set)
- Merge
- Summarize
- Sort

## Preparation
- [Sign up for n8n Cloud](/n8n-sign-up) or open your n8n workspace. No other account or key is needed.
- The results file is https://n8n-challenges.app/fixtures/premier-league-2024-25.json, a copy of the public-domain [openfootball](https://github.com/openfootball/football.json) data. Each match has team1 (home), team2 (away), date and score.ft, the full-time score as [home goals, away goals]. Other leagues and seasons live in the same repository.
- Have the official 2024–25 final table at hand (any sports site) to compare your result.

## Requirements
- The output has exactly 20 rows, one per team, each with 38 games played, points, goal difference and goals scored, numbered from 1 to 20.
- The order matches the official table: Liverpool first with 84 points and Southampton last with 12 – and Newcastle United sit above Aston Villa, who also have 66 points, thanks to goal difference.
- Bonus: with 25 December 2024 as the date, the same workflow shows Liverpool top with 39 points from 16 games and Southampton bottom with 6.

## Tips
- Start with Manual Trigger and HTTP Request (GET) to the results file: the response is one item with a matches list. Add Split Out on matches to get 380 items.
- Each match must become two rows – one for the home team, one for the away team. Connect two Edit Fields (Set) nodes to Split Out: Home team row with team = team1, goals_for = score.ft[0] and goals_against = score.ft[1]; Away team row with team2 and the goals swapped. Turn off Include Other Input Fields.
- In both Edit Fields (Set) nodes add goal_difference and points as numbers: {{ $json.score.ft[0] > $json.score.ft[1] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }} for the home side (swap the indexes for the away side). Then join the two branches with Merge in Append mode – 760 rows.
- Summarize does the adding up: split by team, count team (games played) and sum points, goal_difference and goals_for. Its output fields are called count_team, sum_points and so on – 20 items.
- Sort by sum_points, then sum_goal_difference, then sum_goals_for, all descending; a final Edit Fields (Set) can add position = {{ $itemIndex + 1 }}. For the bonus, add Edit Fields (Set) with a cutoff date right after the trigger and a Filter after Split Out: date (Date & Time type) is before or equal to {{ $('Edit Fields').first().json.cutoff }}.

# Spanish

## Title
Construye la tabla de la liga

## Summary
Reconstruye la clasificación final de la Premier League de la temporada pasada a partir de los 380 resultados y compárala con la real.

## Concept
Transformar registros con dos ramas, Merge (append), Summarize y Sort con criterios de desempate

## Glossary
- diferencia de goles: Goles a favor menos goles en contra en toda la temporada. Con los mismos puntos, la mejor diferencia de goles queda por encima.
- criterios de desempate: Las reglas adicionales que deciden el orden cuando los equipos empatan a puntos: primero la diferencia de goles, luego los goles a favor.
- modo Append: El ajuste de Merge que simplemente pone los ítems de las dos entradas uno detrás de otro, sin emparejarlos.
- archivo de datos: Un archivo JSON que los programas pueden leer: aquí, un objeto por partido con los equipos, la fecha y el marcador final.

## Scenario
- Una liga de fútbol sala que publica su propia clasificación a partir de una hoja de resultados.
- Un boletín deportivo que recalcula la tabla en cuanto llegan los marcadores del fin de semana.
- Cualquier informe que sume eventos por persona, producto o equipo: ventas por comercial, tickets por agente.

## Task
Aquí tienes los 380 resultados de la temporada 2024–25 de la Premier League en un solo archivo de datos. Reconstruye la clasificación final: una fila por equipo con partidos jugados, puntos, diferencia de goles y goles a favor, en el orden correcto del campeón al último.

## Bonus Task
Haz que la tabla funcione para cualquier fecha que elijas – por ejemplo, cómo estaba el día de Navidad de 2024 – sin cambiar nada más.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- Edit Fields (Set)
- Merge
- Summarize
- Sort

## Preparation
- [Regístrate en n8n Cloud](/n8n-sign-up) o abre tu espacio de n8n. No necesitas ninguna otra cuenta ni clave.
- El archivo de resultados es https://n8n-challenges.app/fixtures/premier-league-2024-25.json, una copia de los datos de dominio público de [openfootball](https://github.com/openfootball/football.json). Cada partido tiene team1 (local), team2 (visitante), date y score.ft, el marcador final como [goles local, goles visitante]. En el mismo repositorio hay más ligas y temporadas.
- Ten a mano la clasificación final oficial de 2024–25 (cualquier web deportiva) para comparar tu resultado.

## Requirements
- La salida tiene exactamente 20 filas, una por equipo, cada una con 38 partidos jugados, puntos, diferencia de goles y goles a favor, numeradas del 1 al 20.
- El orden coincide con la tabla oficial: Liverpool primero con 84 puntos y Southampton último con 12; y Newcastle United queda por encima de Aston Villa, que también tiene 66 puntos, gracias a la diferencia de goles.
- Bonus: con el 25 de diciembre de 2024 como fecha, el mismo workflow muestra al Liverpool líder con 39 puntos en 16 partidos y al Southampton último con 6.

## Tips
- Empieza con Manual Trigger y HTTP Request (GET) al archivo de resultados: la respuesta es un ítem con una lista matches. Añade Split Out sobre matches para obtener 380 ítems.
- Cada partido debe convertirse en dos filas: una para el equipo local y otra para el visitante. Conecta dos nodos Edit Fields (Set) a Split Out: Home team row con team = team1, goals_for = score.ft[0] y goals_against = score.ft[1]; Away team row con team2 y los goles intercambiados. Desactiva Include Other Input Fields.
- En ambos Edit Fields (Set) añade goal_difference y points como números: {{ $json.score.ft[0] > $json.score.ft[1] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }} para el local (intercambia los índices para el visitante). Después une las dos ramas con Merge en modo Append: 760 filas.
- Summarize hace las sumas: divide por team, cuenta team (partidos jugados) y suma points, goal_difference y goals_for. Sus campos de salida se llaman count_team, sum_points, etc.: 20 ítems.
- Ordena con Sort por sum_points, luego sum_goal_difference y luego sum_goals_for, todos descendentes; un Edit Fields (Set) final puede añadir position = {{ $itemIndex + 1 }}. Para el bonus, añade un Edit Fields (Set) con la fecha límite justo después del trigger y un Filter tras Split Out: date (tipo Date & Time) es anterior o igual a {{ $('Edit Fields').first().json.cutoff }}.

# Ukrainian

## Title
Побудуй турнірну таблицю

## Summary
Відтвори підсумкову таблицю Прем’єр-ліги минулого сезону з усіх 380 результатів і звір її зі справжньою.

## Concept
Перетворення записів двома гілками, Merge (append), Summarize і Sort із додатковими критеріями

## Glossary
- різниця м’ячів: Забиті м’ячі мінус пропущені за сезон. За однакової кількості очок вище стоїть команда з кращою різницею.
- додаткові критерії: Правила, які визначають порядок команд з однаковою кількістю очок: спочатку різниця м’ячів, потім забиті м’ячі.
- режим Append: Налаштування Merge, яке просто ставить елементи з обох входів один за одним, не зіставляючи їх.
- файл даних: JSON-файл, який можуть читати програми: тут – один об’єкт на матч із командами, датою та фінальним рахунком.

## Scenario
- Аматорська ліга, яка публікує власну таблицю з аркуша результатів.
- Спортивна розсилка, що перераховує таблицю, щойно надходять рахунки вихідних.
- Будь-який звіт, що підсумовує події за людиною, товаром чи командою: продажі за менеджером, тікети за агентом.

## Task
Ось усі 380 результатів сезону 2024–25 Прем’єр-ліги в одному файлі даних. Відтвори підсумкову таблицю: один рядок на команду з кількістю матчів, очками, різницею м’ячів і забитими м’ячами, у правильному порядку від чемпіона до останнього місця.

## Bonus Task
Зроби так, щоб таблиця працювала для будь-якої обраної дати – наприклад, покажи, якою вона була на Різдво, 25 грудня 2024 року, – нічого більше не змінюючи.

## Nodes
- Manual Trigger
- HTTP Request
- Split Out
- Filter
- Edit Fields (Set)
- Merge
- Summarize
- Sort

## Preparation
- [Зареєструйся в n8n Cloud](/n8n-sign-up) або відкрий свій простір n8n. Інших акаунтів чи ключів не потрібно.
- Файл результатів: https://n8n-challenges.app/fixtures/premier-league-2024-25.json – копія даних [openfootball](https://github.com/openfootball/football.json), які є суспільним надбанням. Кожен матч має team1 (господарі), team2 (гості), date і score.ft – фінальний рахунок у вигляді [голи господарів, голи гостей]. У тому ж репозиторії є інші ліги й сезони.
- Тримай під рукою офіційну підсумкову таблицю 2024–25 (будь-який спортивний сайт), щоб порівняти результат.

## Requirements
- У результаті рівно 20 рядків, по одному на команду, кожен із 38 зіграними матчами, очками, різницею м’ячів і забитими м’ячами, пронумерованих від 1 до 20.
- Порядок збігається з офіційною таблицею: Liverpool перший з 84 очками, Southampton останній з 12; а Newcastle United вище за Aston Villa, що теж має 66 очок, завдяки різниці м’ячів.
- Бонус: з датою 25 грудня 2024 року той самий воркфлоу показує Liverpool лідером із 39 очками після 16 матчів і Southampton останнім із 6.

## Tips
- Почни з Manual Trigger і HTTP Request (GET) до файлу результатів: відповідь – один елемент зі списком matches. Додай Split Out для matches, щоб отримати 380 елементів.
- Кожен матч має стати двома рядками: один для господарів, один для гостей. Під’єднай до Split Out дві ноди Edit Fields (Set): Home team row з team = team1, goals_for = score.ft[0] і goals_against = score.ft[1]; Away team row з team2 і поміняними місцями голами. Вимкни Include Other Input Fields.
- В обох Edit Fields (Set) додай goal_difference і points як числа: {{ $json.score.ft[0] > $json.score.ft[1] ? 3 : $json.score.ft[0] === $json.score.ft[1] ? 1 : 0 }} для господарів (для гостей поміняй індекси). Потім об’єднай дві гілки через Merge у режимі Append – 760 рядків.
- Summarize робить підрахунок: розділи за team, порахуй team (зіграні матчі) і підсумуй points, goal_difference та goals_for. Його вихідні поля називаються count_team, sum_points тощо – 20 елементів.
- Відсортуй через Sort за sum_points, потім sum_goal_difference, потім sum_goals_for, усі за спаданням; фінальний Edit Fields (Set) може додати position = {{ $itemIndex + 1 }}. Для бонусу додай Edit Fields (Set) із граничною датою одразу після тригера і Filter після Split Out: date (тип Date & Time) раніше або дорівнює {{ $('Edit Fields').first().json.cutoff }}.
