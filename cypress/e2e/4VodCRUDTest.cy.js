/// <reference types="cypress" />
import VOD from "../PageObjects/VOD"


describe('VOD Module CRUD Test', () => {

let liveEventData;
let categoryData;
let vodData;
const vod = new VOD();

    before(() => {
        cy.fixture('categoryData.json').then((data) => {
            categoryData = data;
        })
        
        cy.fixture('liveEventData.json').then((data) => {
            liveEventData = data;
        })

        cy.fixture('vodData.json').then((data) => {
            vodData = data;
        })
    })

    beforeEach(() => {
        cy.login('username', 'pass')
    })

    it('Test to CREATE VOD', () => {

        vod.clickVodMenu(vodData.vod)
        vod.clickVodButton()
        vod.verifyVodTitle(vodData.addVideo)
        vod.clickVodSubmit(vodData.vodSubmit)
        vod.checkValidation(categoryData.titleJP, categoryData.titleEN, categoryData.descriptionJP, categoryData.descriptionEN, liveEventData.txtStreamURL, liveEventData.txtCoverImage, liveEventData.txtThumbnail)
        vod.clickCancelButton(categoryData.txtCancel)
        vod.clickVodButton()
        vod.fillInputFields(vodData.vodTitleJP, vodData.vodTitleEN, vodData.vodDescJP, vodData.vodDescEN, liveEventData.txtStreamValue, liveEventData.txtVideoType, liveEventData.txtCategoryValue, vodData.vodStatus, vodData.vodPurchase)
        vod.clickVodSubmit(vodData.vodSubmit)
        vod.checkAddedVod(vodData.vodTitleJP)
    })

    it('Test to UPDATE/EDIT VOD', () => {

        vod.clickVodMenu(vodData.vod)
        vod.editAddedVod(vodData.vodTitleJP)
        vod.verifyEditVodTitle(vodData.editVodTitle)
        vod.updateInputFields(vodData.upVodTitleJP, vodData.upVodTitleEN, vodData.upVodDescJP, vodData.upVodDescEN, liveEventData.uptxtStreamValue, liveEventData.uptxtVideoType, liveEventData.txtEditCategoryValue, vodData.upVodStatus, vodData.upVodPurchase)
        vod.clickVodSubmit(vodData.vodSubmit)
        vod.checkupdatedVod(vodData.upVodTitleJP)
    })

    it('Test to DELETE VOD', () => {

        vod.clickVodMenu(vodData.vod)
        vod.deleteVOD(vodData.upVodTitleJP, vodData.confirmMsg, vodData.confirmDel, vodData.successMsg)


    })

})