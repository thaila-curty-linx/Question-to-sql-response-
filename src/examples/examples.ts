export const examples = [
  { input: "Liste todos os pedidos.", query: "SELECT * FROM orders;" },
  {
    input: "Qual é a quantidade de clientes?",
    query: `SELECT 
    COUNT(*) AS total_clientes
FROM 
    customers;
`,
  },

  {
    input: "Qual é quantidade de total de venda por mês?",
    query: `SELECT 
    DATE_FORMAT(i.invoice_date, '%Y-%m') AS mes,
    SUM(od.unit_price * od.quantity) AS total_vendas
FROM 
    invoices i
JOIN 
    orders o ON i.order_id = o.id
JOIN 
    order_details od ON o.id = od.order_id
GROUP BY 
    mes
ORDER BY 
    mes;
`,
  },

  {
    input: "Quais são os clientes que mais compraram?",
    query: `SELECT 
    c.id,
    c.company,
    COUNT(od.id) AS total_compras
FROM 
    customers c
JOIN 
    orders o ON c.id = o.customer_id
JOIN 
    order_details od ON o.id = od.order_id
GROUP BY 
    c.id, c.company
ORDER BY 
    total_compras DESC
LIMIT 10;
`,
  },

  {
    input: "Qual é o valor total de todas as vendas realizadas por ano?",
    query: `'SELECT \n' +
    '    YEAR(o.order_date) AS ano,\n' +
    '    SUM(od.unit_price * od.quantity) AS total_vendas\n' +
    'FROM \n' +
    '    orders o\n' +
    'JOIN \n' +
    '    order_details od ON o.id = od.order_id\n' +
    'GROUP BY \n' +
    '    ano\n' +
    'ORDER BY \n' +
    '    ano;',`,
  },
];
