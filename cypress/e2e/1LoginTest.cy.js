/// <reference types="cypress" />

describe('Login Module Test', () => {

    beforeEach(() => {
        cy.visit('https://api.dev.dartslive.tv/admin/login')
        // cy.viewport(1440, 900)
    })

    it('Test Error message, When email and password fields are blank', () => {
        cy.get('button').contains('Sign In').click()
        cy.get('li').first().should('have.text', 'username は必須項目です。')
        cy.get('li').last().should('have.text', 'password は必須項目です。')
    })


    it('Test for valid email and blank password field', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('button').contains('Sign In').click()
        cy.get('li').last().should('have.text', 'password は必須項目です。')
    })


    it('Test for blank email field and valid password entered', () => {
        cy.get('input[name="password"]').type('123456')
        cy.get('button').contains('Sign In').click()
        cy.get('li').first().should('have.text', 'username は必須項目です。')

    })

    it('Test for Invalid Credentials entered', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('123456333')
        cy.get('button').contains('Sign In').click()
        cy.get('li').first().should('have.text', 'The provided credentials do not match our records.')

    })

    it('Test for Valid Credentials entered', () => {
        cy.get('input[name="username"]').type('admin')
        cy.get('input[name="password"]').type('123456')
        cy.get('button').contains('Sign In').click()
        cy.get('span').contains('Admin').click()
        cy.get('a').contains('Sign out').should('be.visible').click()


    })

})