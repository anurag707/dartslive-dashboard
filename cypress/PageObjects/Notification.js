class Notification{

    //locators
    list = 'li'
    addNoti = '.fa.fa-plus'
    verifyTitle = '.box-title > strong'
    btnSubmit = '.btn-primary'
    cancelLbl = 'a'
    titleJP = 'textarea[name="message_jp"]'
    titleEN = 'textarea[name="message_en"]'
    alertType = '#select2-message_type-container'
    searchField = '.select2-search__field'
    selectResults = '.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted'
    notiFilter = '#notifications_table_filter > label > .form-control'
    deleteNoti = '#delete-notification'
    cancel = '.swal2-cancel'
    confirmDelete = '.swal2-confirm'
    alertDialogBox = '#swal2-html-container'
    notiSubmit = 'button'

    clickNotiMenu(txtNoti){
        cy.get(this.list).contains(txtNoti).click()
    }

    addNotification(){
        cy.get(this.addNoti).click()
    }

    verifyNotifictionTitle(txtAddNoti){
        cy.get(this.verifyTitle).should('have.text', txtAddNoti)
    }

    clickNotiSubmit(){
        cy.get(this.btnSubmit).click()
    }

    checkValidation(msgJP, msgEN){
        cy.get(this.list).contains(msgJP).should('be.visible')
        cy.get(this.list).contains(msgEN).should('be.visible')
    }

    clickCancelBtn(txtCancel){
        cy.get('a').contains(txtCancel).click()
    }

    fillInputFields(inputNotiJP, inputNotiEN, notiType){
        cy.get(this.titleJP).type(inputNotiJP)
        cy.get(this.titleEN).type(inputNotiEN)

        cy.get(this.alertType).click()
        cy.get(this.searchField).type(notiType)
        cy.get(this.selectResults)
            .click()

    }

    verifyAddedNotification(inputNotiJP){
        cy.wait(3000)
        cy.get(this.notiFilter).type(inputNotiJP)
        cy.wait(2000)
        cy.contains('td', inputNotiJP)
            .parent('tr')
            .find('a').eq(0)
            .click()
    }

    updateNotification(editNoti, upNotiJP, upNotiEN, notiType){
        cy.get(this.verifyTitle).should('have.text', editNoti)

        cy.get(this.titleJP).clear().type(upNotiJP)
        cy.get(this.titleEN).clear().type(upNotiEN)

        cy.get(this.alertType).click()
        cy.get(this.searchField).type(notiType)
        cy.get(this.selectResults)
            .click()
    }

    delNotificationItems(upNotiJP, successMsg, okDelete, verifyData){
        cy.wait(2000)
        cy.get(this.notiFilter).type(upNotiJP)
        cy.wait(3000)
        cy.contains('td', upNotiJP)
            .parent('tr')
            .find('a').eq(1)
            .click()
        cy.wait(2000)

        cy.get(this.cancel).click()

        cy.get(this.deleteNoti).click()
        cy.wait(2000)
        cy.get(this.confirmDelete).click()
        cy.wait(3000)
        cy.get(this.alertDialogBox).should('have.text', successMsg)
        cy.get(this.notiSubmit).contains(okDelete).click()

        cy.get(this.notiFilter).clear().type(upNotiJP)
        cy.wait(2000)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', verifyData)
        })
    }





}

export default Notification;