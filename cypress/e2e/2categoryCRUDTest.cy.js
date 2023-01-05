/// <reference types="cypress" />

describe('Catergory Module CRUD Test', () => {

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('Test to CREATE Category', () => {

        cy.get('li').contains('カテゴリー').click()
        cy.get('.fa.fa-plus').click()

        cy.get('.box-title > strong').should('have.text', 'カテゴリー追加')

        cy.get('button').contains('送信').click()

        cy.get('span').contains('title jp は必須項目です。').should('be.visible')
        cy.get('span').contains('title en は必須項目です。').should('be.visible')
        cy.get('span').contains('description jp は必須項目です。').should('be.visible')
        cy.get('span').contains('description en は必須項目です。').should('be.visible')
        cy.get('span').contains('priority は必須項目です。').should('be.visible')

        cy.get('a').contains('キャンセル').click()
        cy.get('.fa.fa-plus').click()

        cy.get('input[type="text"]').first().type('This is Japanese title')
        cy.get('input[type="text"]').last().type('This is english title')
        cy.get('trix-editor[input="description_jp"]').type('This is japanese description')
        cy.get('trix-editor[input="description_en"]').type('This is english description')

        cy.get('#select2-show_in_menu-container').click()
        cy.get('li').contains('いいえ').click()

        cy.get('#select2-status-container').click()
        cy.get('li').contains('無効').click()

        cy.get('input[type="number"]').type('4')

        cy.get('#add_coupon_row').click()

        const cover_filepath = '22st1_ja_16_1.jpg'
        cy.get('#coupon_image').selectFile(cover_filepath)
        cy.get('#coupon_url').type('https://www.dartshive.jp/')
        cy.get('#coupon_priority').type('12')

        cy.get('.btn-primary').click()

        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', 'This is Japanese title')
        })

    })

    it('Test to EDIT Category', () => {

        cy.get('li').contains('カテゴリー').click()
        cy.contains('td', 'This is Japanese title')
            .parent('tr')
            .find('a').eq(3)
            .click()

        cy.get('.box-title > strong').should('have.text', 'カテゴリー編集')

        cy.get('input[type="text"]').first().clear().type('This is Japanese Updated title')
        cy.get('input[name="title_en"]').clear().type('This is english Updated title')
        cy.get('trix-editor[input="description_jp"]').clear().type('This is japanese updated description')
        cy.get('trix-editor[input="description_en"]').clear().type('This is english updated description')

        cy.get('#select2-show_in_menu-container').click()
        cy.get('li').contains('はい').click()

        cy.get('#select2-status-container').click()
        cy.get('li').contains('有効').click()

        cy.get('input[placeholder="優先を入力してください"]').type('3795')

        const category_logoImage = '22st1_ja_16_1.jpg'
        cy.get('#logo_img').selectFile(category_logoImage)

        // cy.get('button').contains('削除する').click()
        // cy.wait(2000)
        // cy.get('button').contains('確認').click()
        // cy.wait(2000)
        // cy.get('#swal2-html-container').should('have.text', 'Coupon is  deleted')
        // cy.get('button').contains('OK').click()
        // cy.wait(2000)

        cy.get('.btn-primary').scrollIntoView().wait(2000).click()
        cy.wait(2000)

        cy.get('tbody > tr').within(tableRow => {
            cy.wrap(tableRow).find('td').should('contain', 'This is Japanese Updated title')
                .parent('tr')
                .find('a').eq(3).click()
        })

    })

    it('Test to DELETE Category', () => {

        cy.get('li').contains('カテゴリー').click()
        cy.contains('td', 'This is Japanese Updated title')
            .parent('tr')
            .find('a').eq(4)
            .click()

        cy.get('.swal2-cancel').click()

        cy.contains('td', 'This is Japanese Updated title')
            .parent('tr')
            .find('a').eq(4)
            .click()
        cy.wait(2000)
        cy.get('.swal2-confirm').click()
        cy.wait(2000)
        cy.get('#swal2-html-container').should('have.text', 'カテゴリが削除されます。')
        cy.get('.swal2-confirm').click()

    })

})