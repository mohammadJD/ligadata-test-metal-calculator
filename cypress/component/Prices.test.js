import React from 'react';
import { mount } from 'cypress-react-unit-test';
import '../../src/index.css';
import App from '../../src/App';
import {store} from "../../src/_helpers";
import {Provider} from "react-redux";
const typeOptions = { delay: 100 };

describe('Prices', () => {
  it('renders learn react link', () => {
    mount(<Provider store={store}><App /></Provider>,{
      stylesheets: [
        'https://netdna.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      ]
    });

    cy.wait(5000);
    cy.get('#submit-btn').click();
    // cy.get('option[value="XAG"]').click({force:true});
    cy.get('select[name=symbols]').select(['XAU','XAG']);
    // cy.get('select[name=symbols]').select('XAG');
    cy.get('input[name=date]').type('2009-12-30',typeOptions);//30/12/2009
    cy.wait(3000);
    cy.get('input[name=date]').type('2021-02-19',typeOptions);//19/02/2021

    cy.get('#submit-btn').click();
  });
});
