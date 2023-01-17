/// <reference types="cypress" />
import Login from "../PageObjects/1LoginPage"

describe('Login Module Test', () => {

let loginData;
const ln = new Login();

    before(() => {
        cy.fixture('loginData.json').then((data) => {
          loginData = data;
        })
    })

    beforeEach(() => {
        cy.visit('url')
        // cy.viewport(1440, 900)
    })

    it('Test Error message, When email and password fields are blank', () => {

        ln.clickSubmit()
        cy.get('li').first().should('have.text', loginData.errorLblUsername)
        cy.get('li').last().should('have.text', loginData.errorLblPassword)
    })


    it('Test for valid email and blank password field', () => {
        
        ln.setUserName(loginData.username)
        ln.clickSubmit()
        cy.get('li').last().should('have.text', loginData.errorLblPassword)
    })


    it('Test for blank email field and valid password entered', () => {
        
        ln.setPassword(loginData.password)
        ln.clickSubmit()
        cy.get('li').first().should('have.text', loginData.errorLblUsername)

    })

    it('Test for Invalid Credentials entered', () => {
        
        ln.setUserName(loginData.invalidUsername)
        ln.setPassword(loginData.invalidPassword)
        ln.clickSubmit()
        cy.get('li').first().should('have.text', loginData.errorMsg)

    })

    it('Test for Valid Credentials entered', () => {
        
        ln.setUserName(loginData.username)
        ln.setPassword(loginData.password)
        ln.clickSubmit()
        ln.verifyLogin()
    
    })

})