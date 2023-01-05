/// <reference types="cypress" />

describe('Notification Module CRUD Test', () => {

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('To Test CREATE Notification', () => {

        cy.get('li').contains('お知らせ').click()
        cy.get('.fa.fa-plus').click()

        cy.get('.box-title > strong').should('have.text', '通知を追加')

        cy.get('.btn-primary').click()

        cy.get('li').contains('message jp は必須項目です。').should('be.visible')
        cy.get('li').contains('message en は必須項目です。').should('be.visible')

        cy.get('a').contains('キャンセル').click()
        cy.get('.fa.fa-plus').click()

        cy.get('textarea[name="message_jp"]').type("This is Japanese Notification title")
        cy.get('textarea[name="message_en"]').type('This is English Notification title')

        cy.get('#select2-message_type-container').click()
        cy.get('.select2-search__field').type('Emergency')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('.btn-primary').click()
    })

    it('To Test UPDATE/EDIT Notification', () => {

        cy.get('li').contains('お知らせ').click()
        cy.wait(3000)
        cy.get('#notifications_table_filter > label > .form-control').type('This is Japanese Notification title')
        cy.wait(2000)
        cy.contains('td', 'This is Japanese Notification title')
            .parent('tr')
            .find('a').eq(0)
            .click()

        cy.get('.box-title > strong').should('have.text', '通知の編集')

        cy.get('textarea[name="message_jp"]').clear().type("Update Japanese Notification title")
        cy.get('textarea[name="message_en"]').clear().type('Update English Notification title')

        cy.get('#select2-message_type-container').click()
        cy.get('.select2-search__field').type('Emergency')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('.btn-primary').click()
    })

    it('To Test DELETE Notification', () => {


        cy.get('li').contains('お知らせ').click()
        cy.wait(2000)
        cy.get('#notifications_table_filter > label > .form-control').type('Update Japanese Notification title')
        cy.wait(3000)
        cy.contains('td', 'Update Japanese Notification title')
            .parent('tr')
            .find('a').eq(1)
            .click()
        cy.wait(2000)

        cy.get('.swal2-cancel').click()

        cy.get('#delete-notification').click()
        cy.wait(2000)
        cy.get('.swal2-confirm').click()
        cy.wait(3000)
        cy.get('#swal2-html-container').should('have.text', '通知が削除されました。')
        cy.get('button').contains('確認').click()

        cy.get('#notifications_table_filter > label > .form-control').clear().type('Update Japanese Notification title')
        cy.wait(2000)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', '一致するレコードがありません')
        })
    })

})