Feature: UserController
  the user controller is a class that allow to interact with the service
  and also with other elements

  Scenario: Add User
    Given a scope
    When i add new user
    Then the service needs to be called