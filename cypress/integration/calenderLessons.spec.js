/* eslint-disable no-undef */
describe("Form test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("select empty slot", () => {
    cy.get(":nth-child(2) > :nth-child(25) > .rbc-events-container").click();
    cy.get(".ant-modal-content").should("exist");
  });

  it("show error messages when submitting empty fields", () => {
    cy.get(":nth-child(2) > :nth-child(25) > .rbc-events-container").click();
    cy.get(".ant-modal-content").should("exist");
    cy.get("form").submit();
    cy.get(
      ":nth-child(1) > .ant-col-16 > .ant-form-item-explain > .ant-form-item-explain-error"
    ).should("exist");
  });

  it("fill the form", () => {
    cy.get(":nth-child(7) > :nth-child(6) > :nth-child(2)").click({
      force: true,
    });
    cy.get(".ant-modal-content").should("exist");
    cy.get("#control-hooks_lesson_title")
      .type("Cypress Typing")
      .should("have.value", "Cypress Typing");
    cy.get("#control-hooks_lesson_subject")
      .type("Cypress Course")
      .should("have.value", "Cypress Course");
    cy.get("#control-hooks_lesson_description")
      .type("Cypress created that lesson, cypress is fun!")
      .should("have.value", "Cypress created that lesson, cypress is fun!");

    cy.get("form").submit();
  });

  it("delete lesson", () => {
    cy.get(".rbc-event").click();
    cy.get(".ant-modal-content").should("exist");
    cy.get(".ant-modal-footer > .ant-btn").click();
    cy.get(".ant-modal-confirm-body-wrapper");
    cy.get(".ant-btn-dangerous").click();
  });
});
