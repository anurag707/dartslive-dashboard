/// <reference types="cypress" />
import LiveEvent from "../PageObjects/3LiveEvent"

describe('LiveEvent Module CRUD Test', () => {

let liveEventData;
let categoryData;
const live = new LiveEvent();

    before(() => {
        cy.fixture('categoryData.json').then((data) => {
            categoryData = data;
        })
        
        cy.fixture('liveEventData.json').then((data) => {
            liveEventData = data;
        })
    })

    beforeEach(() => {
        cy.login('username', 'pass')
    })

    it('To test CREATE feature of live Events', () => {

        live.clickLiveEventMenu(liveEventData.txtLiveEvent)
        live.clickAddLiveEventButton()
        live.verifyLiveTitle(liveEventData.txtAddLiveEvent)
        live.clickLiveSubmit()
        live.checkValidation(categoryData.titleJP, categoryData.titleEN, categoryData.descriptionJP, categoryData.descriptionEN, liveEventData.txtStreamURL, liveEventData.txtStartTime, liveEventData.txtCoverImage, liveEventData.txtThumbnail)
        live.clickCancelButton(categoryData.txtCancel)
        live.clickAddLiveEventButton()
        live.fillInputFields(liveEventData.txtCategoryValue, liveEventData.txtLiveTitleJP, liveEventData.txtLiveTitleEN, liveEventData.txtLiveDescJP, liveEventData.txtLiveDescEN, liveEventData.txtStreamValue, liveEventData.txtVideoType, liveEventData.txtLiveStatus, liveEventData.txtLivePurchase, liveEventData.txtStartValue)
        live.clickLiveSubmit()
        live.checkAddedLiveEvents(liveEventData.txtLiveTitleJP)

    })

    it('To test EDIT/UPDATE feature of live Events', () => {

        live.clickLiveEventMenu(liveEventData.txtLiveEvent)
        live.clickEditLiveEvents(liveEventData.txtLiveTitleJP)
        live.verifyEditLiveEventTitle(liveEventData.txtEditLiveEvent)
        live.updateInputFields(liveEventData.txtEditCategoryValue, liveEventData.uptxtLiveTitleJP, liveEventData.uptxtLiveTitleEN, liveEventData.uptxtLiveDescJP, liveEventData.uptxtStreamValue, liveEventData.uptxtVideoType, liveEventData.uptxtLiveStatus, liveEventData.uptxtLivePurchase, liveEventData.uptxtStartValue, liveEventData.txtEndValue)
        live.clickLiveSubmit()
        live.checkUpdatedLiveEvents(liveEventData.uptxtLiveTitleJP)

    })

    it('To test DELETE feature of live Events', () => {

        live.clickLiveEventMenu(liveEventData.txtLiveEvent)
        live.deleteLiveEvents(liveEventData.uptxtLiveTitleJP, liveEventData.successMsg)

    })


})