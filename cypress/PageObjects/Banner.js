class Banner{

    //locators
    list = 'li'
    addBanner = '.fa.fa-plus'
    verifyTitle = '.box-title > strong'
    btnSubmit = '.btn-primary'
    errorLbl = 'span'
    cancelLbl = 'a'
    titleJP = 'input[name="title_jp"]'
    titleEN = 'input[name="title_en"]'
    selectCategories = '#select2-category_id-container'
    searchField = '.select2-search__field'
    selectResults = '.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted'
    priority = 'input[name="priority"]'
    selectStatus = '#select2-status-container'
    logo = '#logo'
    deleteBanner = '#delete-banner'
    cancel = '.swal2-cancel'
    confirmDelete = '.swal2-confirm'
    alertDialogBox = '#swal2-html-container'
    bannerSubmit = 'button'

    clickBannerMenu(titleBanner){
        cy.get(this.list).contains(titleBanner).click()
    }

    addBannerItem(){
        cy.get(this.addBanner).click()
    }

    verifyBannerTitle(addBanner){
        cy.get(this.verifyTitle).should('have.text', addBanner)
    }

    clickBannerSubmit(){
        cy.get(this.btnSubmit).click()
    }

    checkValidation(titleJP, titleEN, priority, logo){
        cy.get(this.errorLbl).contains(titleJP).should('be.visible')
        cy.get(this.errorLbl).contains(titleEN).should('be.visible')
        cy.get(this.errorLbl).contains(priority).should('be.visible')
        cy.get(this.errorLbl).contains(logo).should('be.visible')
    }

    clickCancelButton(txtCancel){
        cy.get(this.cancelLbl).contains(txtCancel).click()
    }

    fillInputFields(titleJP, titleEN, txtCategoryValue, priorityValue, txtSelectStatusNo){
        cy.get(this.titleJP).type(titleJP)
        cy.get(this.titleEN).type(titleEN)
        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtCategoryValue)
        cy.get(this.selectResults)
            .click()

        cy.get(this.priority).type(priorityValue)

        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(txtSelectStatusNo).click()

        const filepath = '22st1_ja_16_1.jpg'
        cy.get(this.logo).selectFile(filepath)
    }

    clickEditBanner(titleJP){
        cy.wait(1000)
        cy.contains('td', titleJP)
            .parent('tr')
            .find('a').eq(2)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()
    }

    updateBannerItems(editBanner, uptitleJP, uptitleEN, txtEditCategoryValue, uppriorityValue, txtSelectStatusYes){
        cy.get(this.verifyTitle).should('have.text', editBanner)

        cy.get(this.titleJP).clear().type(uptitleJP)
        cy.get(this.titleEN).clear().type(uptitleEN)

        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtEditCategoryValue)
        cy.get(this.selectResults).click()
        cy.get(this.priority).clear().type(uppriorityValue)

        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(txtSelectStatusYes).click()

        const filepath = '22st1_ja_16_1.jpg'
        cy.get(this.logo).selectFile(filepath)
    }

    deleteBannerItems(uptitleJP, successMsg, okDelete){
        cy.contains('td', uptitleJP)
            .parent('tr')
            .find('a').eq(3)
            .click()
        cy.wait(2000)

        cy.get(this.cancel).click()

        cy.get(this.deleteBanner).click()
        cy.wait(2000)
        cy.get(this.confirmDelete).click()
        cy.wait(3000)
        cy.get(this.alertDialogBox).should('have.text', successMsg)
        cy.get(this.bannerSubmit).contains(okDelete).click()
    }


}

export default Banner;