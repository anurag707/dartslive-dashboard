/// <reference types="cypress" />

import Notification from "../PageObjects/Notification";

describe('Notification Module CRUD Test', () => {

let notiData;
const noti = new Notification

    before(() => {
        cy.fixture('notificationData.json').then((data) => {
            notiData = data;
        })
    })

    beforeEach(() => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
    })

    it('To Test CREATE Notification', () => {

        noti.clickNotiMenu(notiData.txtNoti)
        noti.addNotification()
        noti.verifyNotifictionTitle(notiData.txtAddNoti)
        noti.clickNotiSubmit()
        noti.checkValidation(notiData.msgJP,notiData.msgEN)
        noti.clickCancelBtn(notiData.txtCancel)
        noti.addNotification()
        noti.fillInputFields(notiData.inputNotiJP, notiData.inputNotiEN, notiData.notiType)
        noti.clickNotiSubmit()
    })

    it('To Test UPDATE/EDIT Notification', () => {

        noti.clickNotiMenu(notiData.txtNoti)
        noti.verifyAddedNotification(notiData.inputNotiJP)
        noti.updateNotification(notiData.editNoti, notiData.upNotiJP, notiData.upNotiEN, notiData.notiType)
        noti.clickNotiSubmit()
    })

    it('To Test DELETE Notification', () => {

        noti.clickNotiMenu(notiData.txtNoti)
        noti.delNotificationItems(notiData.upNotiJP, notiData.successMsg, notiData.okDelete, notiData.verifyData)
    })

})