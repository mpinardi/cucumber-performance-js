Feature: test

@only
@only1
Scenario: scenario 1
When Check 2
When System out "value out"
Then Wait for 1000

@only2
Scenario Outline: scenario 2
When System out "<value>"

Examples:
|value|
|test|
|fun|
|win|