Feature: Core
  this is the principal core for every javascript and modular architecture

  Scenario: Subscribe a callback
    Given a callback
    When  register a subscriber
    Then  the callback is subscribe


  Scenario: Publish a callback
    Given register a [message] with [result] in the subscriber
    When Execute the [message]
    Then I got the result [result]


  Examples:
    |message|result|
    |msg01| test01|
    |msg02| test02|


Scenario: Test a dom
  Given a query Mock
  When execute a dom function
  Then verify queryMock is executed


Scenario: register a module
  Given a module
  When register the module
  Then a module is register;
