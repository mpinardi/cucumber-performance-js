Feature: test

@only
Scenario: scenario 1
When Check 2
When System out "value out"

@only2
Scenario Outline: scenario 2
When System out "<value>"

Examples:
|value|
|test|
|fun|
|win|