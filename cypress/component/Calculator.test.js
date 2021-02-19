import React from 'react';
import { mount } from 'cypress-react-unit-test';
import '../../src/index.css';
import App from '../../src/App';
import {store} from "../../src/_helpers";
import {Provider} from "react-redux";
const typeOptions = { delay: 100 };

describe('Calculator', () => {
  it('renders learn react link', () => {
    mount(<Provider store={store}><App /></Provider>,{
      stylesheets: [
        'https://netdna.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
      ]
    });

    cy.get('#go-calculator').click();
    cy.wait(5000);
    cy.get('#submit-btn').click();
    cy.get('select[name=currencies]').select(['EUR']);
    cy.get('input[name=amount]').type('2',typeOptions);
    cy.wait(2000);

    cy.get('#submit-btn').click();
  });
});
