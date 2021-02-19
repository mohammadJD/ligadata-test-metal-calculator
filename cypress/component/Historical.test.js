import React from 'react';
import { mount } from 'cypress-react-unit-test';
import '../../src/index.css';
import App from '../../src/App';
import {store} from "../../src/_helpers";
import {Provider} from "react-redux";
const typeOptions = { delay: 100 };

describe('Historical', () => {
  it('renders learn react link', () => {
    mount(<Provider store={store}><App /></Provider>,{
      stylesheets: [
        'https://netdna.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      ]
    });

    cy.get('#go-historical').click();
    cy.wait(5000);
    // cy.get('input[name=picker-interval]').clear();
    // cy.get('html').click();
    // cy.wait(3000);

    // cy.get('option[value="XAG"]').click({force:true});
    cy.get('select[name=metals]').select(['XAG']);
    cy.get('input[name=picker-interval]').focus();
    cy.get('input[name=picker-interval]').clear();
    cy.wait(2000);
    cy.get('input[name=picker-interval]').type('11/30/2009 - 01/01/2010',typeOptions);//wrong test case
    cy.wait(2000);
    cy.get('html').click();
    cy.get('#submit-btn').click();
    cy.wait(4000);
    cy.get('input[name=picker-interval]').clear();
    cy.wait(3000);
    cy.get('input[name=picker-interval]').focus();
    cy.wait(1000);
    cy.get('input[name=picker-interval]').type('02/17/2021 - 02/19/2021',typeOptions);
    cy.wait(4000);

    cy.get('#submit-btn').click();
  });
});
