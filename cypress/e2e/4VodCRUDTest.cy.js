/// <reference types="cypress" />

describe('VOD Module CRUD Test', () => {

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('Test to CREATE VOD', () => {

        cy.get('li').contains('ビデオ').click()
        cy.get('.fa.fa-plus').click()

        cy.get('.box-title > strong').should('have.text', '新しい ビデオを追加')

        cy.get('button').contains('送信').click()
        cy.get('span').contains('title jp は必須項目です。').should('be.visible')
        cy.get('span').contains('title en は必須項目です。').should('be.visible')
        cy.get('span').contains('description jp は必須項目です。').should('be.visible')
        cy.get('span').contains('description en は必須項目です。').should('be.visible')

        cy.get('a').contains('キャンセル').click()
        cy.get('.fa.fa-plus').click()

        cy.get('#title_jp').type("This is Japanese Vod title")
        cy.get('#title_en').type('This is English Vod title')
        cy.get('#trix_jp').type('This is japanese Vod description')
        cy.get('#trix_en').type('This is english Vod description')
        cy.get('#stream_url').type('https://test.com')

        cy.get('#select2-url_type-container').click()
        cy.get('li').contains(' Wms').click()

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('pdj')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('#select2-status-container').click()
        cy.get('li').contains('InActive').click()

        cy.get('#select2-purchase_type-container').click()
        cy.get('.select2-search__field').type('Premium')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()


        const filepath = '22st1_ja_16_1.jpg'
        cy.get('#cover_image').selectFile(filepath)

        cy.get('#same_image').click()
        cy.get('button').contains('送信').click()
    })

    it('Test to UPDATE/EDIT VOD', () => {

        cy.get('li').contains('ビデオ').click()

        cy.get('#videos_table_filter > label > .form-control').type('This is Japanese Vod title')
        cy.wait(3000)
        cy.contains('td', 'This is Japanese Vod title')
            .parent('tr')
            .find('a').eq(2)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()

        cy.get('.box-title > strong').should('have.text', 'ビデオを編集する')

        cy.get('#title_jp').clear().type("Update This is Japanese Vod title")
        cy.get('#title_en').clear().type('Update This is English Vod title')
        cy.get('#trix_jp').clear().type('Update This is japanese Vod description')
        cy.get('trix-editor[input="description_en"]').clear().type('Update This is english Vod description')
        cy.get('#stream_url').clear().type('https://Updatethisurl.com')

        cy.get('#select2-url_type-container').click()
        cy.get('li').contains(' Youtube').click()

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('the world online')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('#select2-status-container').click()
        cy.get('li').contains('Active').click()

        cy.get('#select2-purchase_type-container').click()
        cy.get('.select2-search__field').type('standard')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted').click()


        const filepath = '22st1_ja_16_1.jpg'
        cy.get('#cover_image').selectFile(filepath)

        cy.get('#thumbnail').selectFile(filepath)
        cy.get('button').contains('送信').click()
    })

    it('Test to DELETE VOD', () => {

        cy.get('li').contains('ビデオ').click()

        cy.get('#videos_table_filter > label > .form-control').type('Update This is Japanese Vod title')
        cy.wait(3000)

        cy.get('#delete-video').click()
        cy.wait(2000)
        cy.get('.swal2-cancel').click()

        cy.get('#delete-video').click()
        cy.wait(2000)
        cy.get('.swal2-confirm').click()
        cy.wait(3000)
        cy.get('#swal2-html-container').should('have.text', 'ビデオは削除されます。')
        cy.get('button').contains('確認').click()

        cy.get('#videos_table_filter > label > .form-control').clear().type('Update This is Japanese Vod title')
        cy.wait(3000)
        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', '一致するレコードがありません')
        })


    })

})