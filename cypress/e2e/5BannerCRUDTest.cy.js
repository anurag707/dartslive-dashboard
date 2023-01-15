/// <reference types="cypress" />

import Banner from "../PageObjects/Banner";

describe('Banner Module CRUD Test', () => {

let liveEventData;
let categoryData;
let vodData;
let bannerData;
const banner = new Banner

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

        cy.fixture('bannerData.json').then((data) => {
            bannerData = data;
        })
    })

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('Test to CREATE Banner', () => {

        banner.clickBannerMenu(bannerData.titleBanner)
        banner.addBannerItem()
        banner.verifyBannerTitle(bannerData.addBanner)
        banner.clickBannerSubmit()
        banner.checkValidation(categoryData.titleJP, categoryData.titleEN, categoryData.priority, bannerData.logo)
        banner.clickCancelButton(categoryData.txtCancel)
        banner.addBannerItem()
        banner.fillInputFields(bannerData.titleJP, bannerData.titleEN, liveEventData.txtCategoryValue, categoryData.priorityValue, categoryData.txtSelectStatusNo)
        banner.clickBannerSubmit()

    })

    it('Test to UPDATE/EDIT Banner', () => {

        banner.clickBannerMenu(bannerData.titleBanner)
        banner.clickEditBanner(bannerData.titleJP)
        banner.updateBannerItems(bannerData.editBanner, bannerData.uptitleJP, bannerData.uptitleEN, liveEventData.txtEditCategoryValue, categoryData.uppriorityValue, categoryData.txtSelectStatusYes)
        banner.clickBannerSubmit()
    })

    it('Test to DELETE Banner', () => {
       
        banner.clickBannerMenu(bannerData.titleBanner)
        banner.deleteBannerItems(bannerData.uptitleJP, bannerData.successMsg, bannerData.okDelete)
    })

})