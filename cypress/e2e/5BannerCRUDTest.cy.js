/// <reference types="cypress" />

describe('Banner Module CRUD Test', () => {

    beforeEach(() => {
        cy.login('admin', '123456')
    })

    it('Test to CREATE Banner', () => {

        cy.get('li').contains('バナー').click()
        cy.get('.fa.fa-plus').click()

        cy.get('.box-title > strong').should('have.text', 'バナーを追加')

        cy.get('.btn-primary').click()

        cy.get('span').contains('title jp は必須項目です。').should('be.visible')
        cy.get('span').contains('title en は必須項目です。').should('be.visible')
        cy.get('span').contains('priority は必須項目です。').should('be.visible')
        cy.get('span').contains('logo は必須項目です。').should('be.visible')

        cy.get('a').contains('キャンセル').click()
        cy.get('.fa.fa-plus').click()

        cy.get('input[name="title_jp"]').type("This is Japanese Banner title")
        cy.get('input[name="title_en"]').type('This is English Banner title')

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('pdj')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('input[name="priority"]').type('12')

        cy.get('#select2-status-container').click()
        cy.get('li').contains('無効').click()

        const filepath = '22st1_ja_16_1.jpg'
        cy.get('#logo').selectFile(filepath)

        cy.get('.btn-primary').click()
    })

    it('Test to UPDATE/EDIT Banner', () => {

        cy.get('li').contains('バナー').click()
        cy.wait(1000)
        cy.contains('td', 'This is Japanese Banner title')
            .parent('tr')
            .find('a').eq(2)
            .should($el => {
                expect(Cypress.dom.isDetached($el)).to.eq(false)
            })
            .click()

        cy.get('.box-title > strong').should('have.text', 'バナーを編集する')

        cy.get('input[name="title_jp"]').clear().type("This is Japanese Updated Banner title")
        cy.get('input[name="title_en"]').clear().type('This is English Updated Banner title')

        cy.get('#select2-category_id-container').click()
        cy.get('.select2-search__field').type('The World Online')
        cy.get('.select2-results__option.select2-results__option--selectable.select2-results__option--highlighted')
            .click()

        cy.get('input[name="priority"]').clear().type('50')

        cy.get('#select2-status-container').click()
        cy.get('li').contains('有効').click()

        const filepath = '22st1_ja_16_1.jpg'
        cy.get('#logo').selectFile(filepath)

        cy.get('.btn-primary').click()
    })

    it('Test to DELETE Banner', () => {

        cy.get('li').contains('バナー').click()

        cy.contains('td', 'This is Japanese Updated Banner title')
            .parent('tr')
            .find('a').eq(3)
            .click()
        cy.wait(2000)

        cy.get('.swal2-cancel').click()

        cy.get('#delete-banner').click()
        cy.wait(2000)
        cy.get('.swal2-confirm').click()
        cy.wait(3000)
        cy.get('#swal2-html-container').should('have.text', 'バナーは削除されます。')
        cy.get('button').contains('確認').click()
    })

})