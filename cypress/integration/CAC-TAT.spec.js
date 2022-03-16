/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("preenche os campos obrigatórios e enviar o formulário", function () {
    const longText =
      "teste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, testteste, Teste, TESTE, Teste, test";
    cy.get("#firstName").type("testfirst");
    cy.get("#lastName").type("testLast");
    cy.get("#email").type("test@email.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get(".success").should("be.visible");
  });
  it("exibe mensagem de erro ao submeter o formulário com email com formatação", function () {
    cy.get("#firstName").type("testfirst");
    cy.get("#lastName").type("testLast");
    cy.get("#email").type("test@email,com");
    cy.get("#open-text-area").type("test");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("campo telefone continua vazio quando preenchido com valor não-numérico", function () {
    cy.get("#phone").type("abcdefghjk").should("have.value", "");
  });
  it("exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido", function () {
    cy.get("#firstName").type("testfirst");
    cy.get("#lastName").type("testLast");
    cy.get("#email").type("test@email,com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("test");
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("testfirst")
      .should("have.value", "testfirst")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("testLast")
      .should("have.value", "testLast")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("test@email.com")
      .should("have.value", "test@email.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("123456789")
      .should("have.value", "123456789")
      .clear()
      .should("have.value", "");
  });

  it.only('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"')
      .check()
      .should("have.value", "feedback");
  });

  it.only("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check().cy.wrap($radio).should("be.checked");
      });
  });
});
