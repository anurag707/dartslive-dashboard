class Login{

    //Locators
    txtUserName = 'input[name="username"]'
    txtPassword = 'input[name="password"]'
    btnSubmit = 'button'
    loginMessage = 'span'
    signOut = 'a'

    setUserName(username){
        
        cy.get(this.txtUserName).type(username)

    }

    setPassword(password){
        
        cy.get(this.txtPassword).type(password)

    }

    clickSubmit(){

        cy.get(this.btnSubmit).contains('Sign In').click()
    }

    verifyLogin(){

        cy.get(this.loginMessage).contains('Admin').click()
        cy.get(this.signOut).contains('Sign out').should('be.visible').click()

    }

    

}

export default Login;