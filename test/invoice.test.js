'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const invoice = require('../lib/invoice');
const pricing = require('../lib/pricing');

test('correct behaviour: invoice matches checkout HSN tax and capped coupon totals', function () {
  const items = [
    {
      id: 5,
      sku: 'OIL-002',
      name: 'Cold-Pressed Groundnut Oil 5L',
      hsn: '1508',
      price: 1120,
      qty: 2
    },
    {
      id: 6,
      sku: 'DRY-001',
      name: 'A2 Gir Cow Ghee 500ml',
      hsn: '0405',
      price: 450,
      qty: 2
    }
  ];
  const checkout = pricing.computeTotals(items, 'SAVE10');
  const order = {
    id: 1004,
    date: '30/01/2022',
    customer: 'Walk-in',
    paymentMode: 'cash',
    status: 'completed',
    items,
    coupon: 'SAVE10',
    subtotal: checkout.subtotal,
    discount: checkout.discount,
    tax: checkout.tax,
    total: checkout.total
  };

  const figures = invoice.computeInvoiceFigures(order);

  assert.equal(checkout.discount, 150);
  assert.equal(figures.subtotal, checkout.subtotal);
  assert.equal(figures.discount, checkout.discount);
  assert.equal(figures.tax, checkout.tax);
  assert.equal(figures.cgst, checkout.cgst);
  assert.equal(figures.sgst, checkout.sgst);
  assert.equal(figures.total, checkout.total);
  assert.deepEqual(
    figures.rows.map(function (row) { return row.gstPercent; }),
    checkout.lines.map(function (line) { return line.gstPercent; })
  );
  assert.deepEqual(
    figures.rows.map(function (row) { return row.lineTax; }),
    checkout.lines.map(function (line) { return line.tax; })
  );
});
