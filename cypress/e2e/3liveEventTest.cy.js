/// <reference types="cypress" />

describe('LiveEvent Module CRUD Test', () => {

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('To test CREATE feature of live Events', () => {

        cy.get('li').contains('ライブイベント').click()
        cy.get('.fa.fa-plus').click()

        cy.get('.box-title > strong').should('have.text', 'ライブイベントを追加')

        cy.get('.btn-primary').click()
        cy.get('span').contains('title jp は必須項目です。').should('be.visible')
        cy.get('span').contains('title en は必須項目です。').should('be.visible')
        cy.get('span').contains('description jp は必須項目です。').should('be.visible')
        cy.get('span').contains('description en は必須項目です。').should('be.visible')
        cy.get('span').contains('stream url は必須項目です。').should('be.visible')
        cy.get('span').contains('start time は必須項目です。').should('be.visible')
        cy.get('span').contains('cover image は必須項目です。').should('be.visible')
        cy.get('span').contains('thumbnail は必須項目です。').should('be.visible')

        cy.get('a').contains('キャンセル').click()
        cy.get('.fa.fa-plus').click()

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('PDJ')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()

        cy.get('#title_jp').type('LIVE Event Automation Japanese title')
        cy.get('#title_en').type('LIVE Event Automation English title')
        cy.get('#trix_jp').type('This is japanese description from Cypress Automation')
        cy.get('#trix_en').type('This is english description from Cypress Automation')
        cy.get('#stream_url').type('https://test.com')

        cy.get('#select2-url_type-container').click()
        cy.get('.select2-search__field').type('wms')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()


        cy.get('#select2-status-container').click()
        cy.get('li').contains('InActive').click()

        cy.get('#select2-purchase_type-container').click()
        cy.get('.select2-search__field').type('trial')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()

        cy.get('input[name="start_time"]').type('2022-12-22T08:30')

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get('#cover_image').selectFile(cover_filepath)

        cy.get('#same_image').click()

        cy.get('.btn-primary').click()

        cy.get('#live_events_table_filter > label > .form-control').type('LIVE Event Automation Japanese title')
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', 'LIVE Event Automation Japanese title')
        })

    })

    it('To test EDIT/UPDATE feature of live Events', () => {

        cy.get('li').contains('ライブイベント').click()
        cy.get('#live_events_table_filter > label > .form-control').type('LIVE Event Automation Japanese title')
        cy.wait(3000)
        cy.contains('td', 'LIVE Event Automation Japanese title')
            .parent('tr')
            .find('a').eq(3)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()

        cy.get('.box-title > strong').should('have.text', 'ライブ イベントの編集')

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('The world online')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()

        cy.get('#title_jp').clear().type('UPDATE LIVE Event  Japanese title')
        cy.get('#title_en').clear().type('UPDATE LIVE Event  English title')
        cy.get('#trix_jp').clear().type('UPDATE This is japanese description from Cypress Automation')
        //cy.get('#trix_jp').first().clear().type('UPDATE This is english description from Cypress Automation')
        cy.get('#stream_url').clear().type('https://updatetest.com')

        cy.get('#select2-url_type-container').click()
        cy.get('.select2-search__field').type('youtube')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()


        cy.get('#select2-status-container').click()
        cy.get('li').contains('Active').click()

        cy.get('#select2-purchase_type-container').click()
        cy.get('.select2-search__field').type('Premium')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()

        cy.get('input[name="start_time"]').type('2023-12-22T08:30')
        cy.get('#end_time').type('2023-02-10T12:10')

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get('#cover_image').selectFile(cover_filepath)

        const thumbnail_filepath = '22st1_ja_16_1.jpg'
        cy.get('#thumbnail').selectFile(thumbnail_filepath)
        cy.get('.btn-primary').click()

        cy.get('#live_events_table_filter > label > .form-control').clear().type('UPDATE LIVE Event  Japanese title')
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', 'UPDATE LIVE Event  Japanese title')
        })

    })

    it('To test DELETE feature of live Events', () => {

        cy.get('li').contains('ライブイベント').click()
        cy.get('#live_events_table_filter > label > .form-control').clear().type('UPDATE LIVE Event  Japanese title')
        cy.wait(3000)

        cy.get('#delete-live_event').click()
        cy.wait(2000)
        cy.get('.swal2-cancel').click()

        cy.get('#delete-live_event').click()
        cy.wait(2000)
        cy.get('.swal2-confirm').click()
        cy.wait(3000)
        cy.get('#swal2-html-container').should('have.text', 'ライブイベントが削除されました。')
        cy.get('button').contains('確認').click()

        cy.get('#live_events_table_filter > label > .form-control').clear().type('UPDATE LIVE Event  Japanese title')
        cy.wait(3000)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', '一致するレコードがありません')
        })

    })


})