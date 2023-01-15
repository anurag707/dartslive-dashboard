class VOD{

    //locators
    list = 'li'
    addVod = '.fa.fa-plus'
    verifyTitle = '.box-title > strong'
    selectCategories = '#select2-category_id-container'
    errorLbl = 'span'
    cancelLbl = 'a'
    selectStatus = '#select2-status-container'
    displayaddedData = 'tbody > tr'
    searchField = '.select2-search__field'
    selectResults = '.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted'
    vodTitleJP = '#title_jp'
    vodTitleEN = '#title_en'
    vodDescJP = '#trix_jp'
    vodDescEN = 'trix-editor[input="description_en"]'
    streamUrl = '#stream_url'
    selectUrlType = '#select2-url_type-container'
    purchaseType = '#select2-purchase_type-container'
    startTime = 'input[name="start_time"]'
    endTime = '#end_time'
    coverImage = '#cover_image'
    sameImage = '#same_image'
    thumbnail = '#thumbnail'
    vodSubmit = '.btn-primary'
    vodSearch = '#videos_table_filter > label > .form-control'
    deleteVod = '#delete-video'
    cancel = '.swal2-cancel'
    confirmDelete = '.swal2-confirm'
    alertDialogBox = '#swal2-html-container'
    vodSubmit = 'button'

    clickVodMenu(vod){
        cy.get(this.list).contains(vod).click()
    }

    clickVodButton(){
        cy.get(this.addVod).click()
    }

    verifyVodTitle(addVideo){
        cy.get(this.verifyTitle).should('have.text', addVideo)
    }

    clickVodSubmit(vodSubmit){
        cy.get(this.vodSubmit).contains(vodSubmit).click()
    }

    checkValidation(titleJP, titleEN, descriptionJP, descriptionEN, txtStreamURL, txtCoverImage, txtThumbnail){
        cy.get(this.errorLbl).contains(titleJP).should('be.visible')
        cy.get(this.errorLbl).contains(titleEN).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionJP).should('be.visible')
        cy.get(this.errorLbl).contains(descriptionEN).should('be.visible')
        cy.get(this.errorLbl).contains(txtStreamURL).should('be.visible')
        cy.get(this.errorLbl).contains(txtCoverImage).should('be.visible')
        cy.get(this.errorLbl).contains(txtThumbnail).should('be.visible')
    }

    clickCancelButton(txtCancel){
        cy.get(this.cancelLbl).contains(txtCancel).click()
    }

    fillInputFields(vodTitleJP, vodTitleEN, vodDescJP, vodDescEN, txtStreamValue, txtVideoType, txtCategoryValue, vodStatus, vodPurchase){
        
        cy.get(this.vodTitleJP).type(vodTitleJP)
        cy.get(this.vodTitleEN).type(vodTitleEN)
        cy.get(this.vodDescJP).type(vodDescJP)
        cy.get(this.vodDescEN).type(vodDescEN)
        cy.get(this.streamUrl).type(txtStreamValue)

        cy.get(this.selectUrlType).click()
        cy.get(this.searchField).type(txtVideoType)
        cy.get(this.selectResults).click()

        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtCategoryValue)
        cy.get(this.selectResults).click()


        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(vodStatus).click()

        cy.get(this.purchaseType).click()
        cy.get(this.searchField).type(vodPurchase)
        cy.get(this.selectResults).click()

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.coverImage).selectFile(cover_filepath)

        cy.get(this.sameImage).click()
    }

    checkAddedVod(vodTitleJP){
        cy.get(this.vodSearch).type(vodTitleJP)
        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', vodTitleJP)
        })
    }

    editAddedVod(vodTitleJP){
        cy.get(this.vodSearch).type(vodTitleJP)
        cy.wait(3000)
        cy.contains('td', vodTitleJP)
            .parent('tr')
            .find('a').eq(2)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()
    }

    verifyEditVodTitle(editVodTitle){
        cy.get(this.verifyTitle).should('have.text', editVodTitle)
    }

    updateInputFields(upVodTitleJP, upVodTitleEN, upVodDescJP,upVodDescEN, uptxtStreamValue, uptxtVideoType, txtEditCategoryValue, upVodStatus, upVodPurchase){
        
        cy.get(this.vodTitleJP).clear().type(upVodTitleJP)
        cy.get(this.vodTitleEN).clear().type(upVodTitleEN)
        cy.get(this.vodDescJP).clear().type(upVodDescJP)
        cy.get(this.vodDescEN).clear().type(upVodDescEN)
        cy.get(this.streamUrl).clear().type(uptxtStreamValue)

        cy.get(this.selectUrlType).click()
        cy.get(this.searchField).type(uptxtVideoType)
        cy.get(this.selectResults).click()

        cy.get(this.selectCategories).click()
        cy.get(this.searchField).type(txtEditCategoryValue)
        cy.get(this.selectResults).click()

        cy.get(this.selectStatus).click()
        cy.get(this.list).contains(upVodStatus).click()

        cy.get(this.purchaseType).click()
        cy.get(this.searchField).type(upVodPurchase)
        cy.get(this.selectResults).click()

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.coverImage).selectFile(cover_filepath)

        const thumbnail_filepath = '22st1_ja_16_1.jpg'
        cy.get(this.thumbnail).selectFile(thumbnail_filepath)
    }

    checkupdatedVod(upVodTitleJP){
        cy.get(this.vodSearch).clear().type(upVodTitleJP)
        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', upVodTitleJP)
        })
    }

    deleteVOD(upVodTitleJP, confirmMsg, confirmDel, successMsg){
        cy.get(this.vodSearch).type(upVodTitleJP)
        cy.wait(3000)

        cy.get(this.deleteVod).click()
        cy.wait(2000)
        cy.get(this.cancel).click()

        cy.get(this.deleteVod).click()
        cy.wait(2000)
        cy.get(this.confirmDelete).click()
        cy.wait(3000)
        cy.get(this.alertDialogBox).should('have.text', confirmMsg)
        cy.get('button').contains(confirmDel).click()

        cy.get(this.vodSearch).clear().type(upVodTitleJP)
        cy.wait(3000)
        cy.get(this.displayaddedData).within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', successMsg)
        })
    }


}

export default VOD;