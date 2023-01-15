class LiveEvent{

    //Locators
    list = 'li'
    addLiveEvent = '.fa.fa-plus'
    verifyTitle = '.box-title > strong'
    selectCategories = '#select2-category_id-container'
    errorLbl = 'span'
    cancelLbl = 'a'
    selectStatus = '#select2-status-container'
    displayaddedData = 'tbody > tr'
    searchField = '.select2-search__field'
    selectResults = '.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted'
    liveTitleJP = '#title_jp'
    liveTitleEN = '#title_en'
    liveDescJP = '#trix_jp'
    liveDescEN = '#trix_en'
    streamUrl = '#stream_url'
    selectUrlType = '#select2-url_type-container'
    purchaseType = '#select2-purchase_type-container'
    startTime = 'input[name="start_time"]'
    endTime = '#end_time'
    coverImage = '#cover_image'
    sameImage = '#same_image'
    thumbnail = '#thumbnail'
    liveSubmit = '.btn-primary'
    liveEventsSearch = '#live_events_table_filter > label > .form-control'
    deletLiveEvent = '#delete-live_event'
    cancel = '.swal2-cancel'
    confirmDelete = '.swal2-confirm'
    alertDialogBox = '#swal2-html-container'

    clickLiveEventMenu(txtLiveEvent){
        cy.get(this.list).contains(txtLiveEvent).click()
    }

    clickAddLiveEventButton(){
        cy.get(this.addLiveEvent).click()
    }

    verifyLiveTitle(txtAddLiveEvent){
        cy.get(this.verifyTitle).should('have.text', txtAddLiveEvent)
    }

    clickLiveSubmit(){
        cy.get(this.liveSubmit).click()
    }

    checkValidation(titleJP, titleEN, descriptionJP, descriptionEN, txtStreamURL, txtStartTime, txtCoverImage, txtThumbnail){
        cy.get(this.errorLbl).contains(titleJP).should('be.visible')
        cy.get(this.errorLbl).contains(titleEN).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionJP).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionEN).should('be.visible')
        cy.get(this.errorLbl).contains(txtStreamURL).should('be.visible')
        cy.get(this.errorLbl).contains(txtStartTime).should('be.visible')
        cy.get(this.errorLbl).contains(txtCoverImage).should('be.visible')
        cy.get(this.errorLbl).contains(txtThumbnail).should('be.visible')
    }

    clickCancelButton(txtCancel){
        cy.get(this.cancelLbl).contains(txtCancel).click()
    }
    
    fillInputFields(txtCategoryValue, txtLiveTitleJP, txtLiveTitleEN, txtLiveDescJP, txtLiveDescEN, txtStreamValue, txtVideoType, txtLiveStatus, txtLivePurchase, txtStartValue){
        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtCategoryValue)
        cy.get(this.selectResults).click()

        cy.get(this.liveTitleJP).type(txtLiveTitleJP)
        cy.get(this.liveTitleEN).type(txtLiveTitleEN)
        cy.get(this.liveDescJP).type(txtLiveDescJP)
        cy.get(this.liveDescEN).type(txtLiveDescEN)
        cy.get(this.streamUrl).type(txtStreamValue)

        cy.get(this.selectUrlType).click()
        cy.get(this.searchField).type(txtVideoType)
        cy.get(this.selectResults).click()


        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(txtLiveStatus).click()

        cy.get(this.purchaseType).click()
        cy.get(this.searchField).type(txtLivePurchase)
        cy.get(this.selectResults).click()

        cy.get(this.startTime).type(txtStartValue)

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.coverImage).selectFile(cover_filepath)

        cy.get(this.sameImage).click()
    }

    checkAddedLiveEvents(txtLiveTitleJP){
        cy.get(this.liveEventsSearch).type(txtLiveTitleJP)
        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', txtLiveTitleJP)
        })
    }

    clickEditLiveEvents(txtLiveTitleJP){
        cy.get(this.liveEventsSearch).type(txtLiveTitleJP)
        cy.wait(3000)
        cy.contains('td', txtLiveTitleJP)
            .parent('tr')
            .find('a').eq(3)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()
    }

    verifyEditLiveEventTitle(txtEditLiveEvent){
        cy.get(this.verifyTitle).should('have.text', txtEditLiveEvent)
    }

    updateInputFields(txtEditCategoryValue, uptxtLiveTitleJP, uptxtLiveTitleEN, uptxtLiveDescJP, uptxtStreamValue, uptxtVideoType, uptxtLiveStatus, uptxtLivePurchase, uptxtStartValue, txtEndValue){
        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtEditCategoryValue)
        cy.get(this.selectResults).click()

        cy.get(this.liveTitleJP).clear().type(uptxtLiveTitleJP)
        cy.get(this.liveTitleEN).clear().type(uptxtLiveTitleEN)
        cy.get(this.liveDescJP).clear().type(uptxtLiveDescJP)
        //cy.get(this.liveDescEN).first().clear().type('UPDATE This is english description from Cypress Automation')
        cy.get(this.streamUrl).clear().type(uptxtStreamValue)

        cy.get(this.selectUrlType).click()
        cy.get(this.searchField).type(uptxtVideoType)
        cy.get(this.selectResults).click()


        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(uptxtLiveStatus).click()

        cy.get(this.purchaseType).click()
        cy.get(this.searchField).type(uptxtLivePurchase)
        cy.get(this.selectResults).click()

        cy.get(this.startTime).type(uptxtStartValue)
        cy.get(this.endTime).type(txtEndValue)

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.coverImage).selectFile(cover_filepath)

        const thumbnail_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.thumbnail).selectFile(thumbnail_filepath)
    }

    checkUpdatedLiveEvents(uptxtLiveTitleJP){
        cy.get(this.liveEventsSearch).clear().type(uptxtLiveTitleJP)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', uptxtLiveTitleJP)
        })
    }

    deleteLiveEvents(uptxtLiveTitleJP, successMsg){
        cy.get(this.liveEventsSearch).clear().type(uptxtLiveTitleJP)
        cy.wait(3000)

        cy.get(this.deletLiveEvent).click()
        cy.wait(2000)
        cy.get(this.cancel).click()

        cy.get(this.deletLiveEvent).click()
        cy.wait(2000)
        cy.get(this.confirmDelete).click()
        cy.wait(3000)
        cy.get(this.alertDialogBox).should('have.text', successMsg)
        cy.get('button').contains('確認').click()

        cy.get(this.liveEventsSearch).clear().type(uptxtLiveTitleJP)
        cy.wait(3000)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', '一致するレコードがありません')
        })
    }
}

export default LiveEvent;