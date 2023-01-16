class Category{

    //Locators
    list = 'li'
    addCategory = '.fa.fa-plus'
    verifyTitle = '.box-title > strong'
    btnSubmit = 'button'
    errorLbl = 'span'
    cancelLbl = 'a'
    txtTitle = 'input[type="text"]'
    txtTitleEN = 'input[name="title_en"]'
    txtDescriptionJP = 'trix-editor[input="description_jp"]'
    txtDescriptionEN = 'trix-editor[input="description_en"]'
    showInMenu = '#select2-show_in_menu-container'
    selectStatus = '#select2-status-container'
    priority = 'input[type="number"]'
    addCoupon = '#add_coupon_row'
    couponImage = '#coupon_image'
    couponURL = '#coupon_url'
    couponPriority = '#coupon_priority'
    addMoreCoupon = '.btn-primary'
    displayaddedData = 'tbody > tr'
    verifiedData = 'td'
    txtEditPriority = 'input[placeholder=" crud.enter_priority"]'
    txtLogo = '#logo_img'
    txtAlertCancel = '.swal2-cancel'
    txtAlertConfirm = '.swal2-confirm'
    txtAlertDialogBox = '#swal2-html-container'

    clickCategoryMenu(txtCategory){
        
        cy.get(this.list).contains(txtCategory).click()

    }

    clickAddCategoryButton(){
        cy.get(this.addCategory).click()
    }

    verifyCategoryTitle(txtAddCategoryTitle){
        cy.get(this.verifyTitle).should('have.text', txtAddCategoryTitle)
    }

    verifyEditCategoryTitle(txtEditCategoryTitle){
        cy.get(this.verifyTitle).should('have.text', txtEditCategoryTitle)
    }

    clickSubmit(txtSubmit){
        cy.get(this.btnSubmit).contains(txtSubmit).click()
    }

    checkValidation(titleJP, titleEN, descriptionJP, descriptionEN, priority){
        cy.get(this.errorLbl).contains(titleJP).should('be.visible')
        cy.get(this.errorLbl).contains(titleEN).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionJP).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionEN).should('be.visible')
        cy.get(this.errorLbl).contains(priority).should('be.visible')

    }

    clickCancel(txtCancel){
        cy.get(this.cancelLbl).contains(txtCancel).click()
    }
    
    fillInputFields(inputTitleJP, inputTitleEN, inputDescriptionJP, inputDescriptionEN,txtShowInMenuNo,txtSelectStatusNo, priorityValue){

        cy.get(this.txtTitle).first().type(inputTitleJP)
        cy.get(this.txtTitle).last().type(inputTitleEN)
        cy.get(this.txtDescriptionJP).type(inputDescriptionJP)
        cy.get(this.txtDescriptionEN).type(inputDescriptionEN)

        cy.get(this.showInMenu).click()
        cy.get(this.list).contains(txtShowInMenuNo).click()

        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(txtSelectStatusNo).click()

        cy.get(this.priority).type(priorityValue)

        cy.get(this.addCoupon).click()

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.couponImage).selectFile(cover_filepath)
        cy.get(this.couponURL).type('https://www.dartshive.jp/')
        cy.get(this.couponPriority).type('12')

        cy.get(this.addMoreCoupon).click()

        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find(this.verifiedData).should('contain', inputTitleJP)
        })

    }

    updateInputFields(upinputTitleJP, upinputTitleEN, upinputDescriptionJP, upinputDescriptionEN, txtShowInMenuYes, txtSelectStatusYes, uppriorityValue){

        cy.get(this.txtTitle).first().clear().type(upinputTitleJP)
        cy.get(this.txtTitleEN).clear().type(upinputTitleEN)
        cy.get(this.txtDescriptionJP).clear().type(upinputDescriptionJP)
        cy.get(this.txtDescriptionEN).clear().type(upinputDescriptionEN)
        cy.get(this.showInMenu).click()
        cy.get(this.list).contains(txtShowInMenuYes).click()
        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(txtSelectStatusYes).click()

        
        cy.get(this.txtEditPriority).clear().type(uppriorityValue)

        const category_logoImage = '22st1_ja_16_1.jpg'
        cy.get(this.txtLogo).selectFile(category_logoImage)

        cy.get(this.addMoreCoupon).scrollIntoView().wait(2000).click()
        cy.wait(2000)

        

    }

    clickEditCategoryMenu(inputTitleJP){
        cy.contains(this.verifiedData, inputTitleJP)
            .parent('tr')
            .find('a').eq(3)
            .click()

    }

    checkUpdatedCategoryMenu(upinputTitleJP){
        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', upinputTitleJP)
                .parent('tr')
        })
    }

    deleteCategoryMenu(upinputTitleJP){
        cy.contains(this.verifiedData, upinputTitleJP)
            .parent('tr')
            .find('a').eq(4)
            .click()
    }

    confirmDeleteCategoryMenu(txtSuccess){
        cy.get(this.txtAlertConfirm).click()
        cy.wait(2000)
        cy.get(this.txtAlertDialogBox).should('have.text', txtSuccess)
        cy.get(this.txtAlertConfirm).click()
    }

    deleteCancelCategoryMenu(){
        cy.get(this.txtAlertCancel).click()
    }


}

export default Category;