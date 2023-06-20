// Comandos MongoDB - Inserção dos dados
db.clients.insertOne({
    "id": 1,
    "nome": "João Silva",
    "endereco": "Rua A, 123",
    "telefone": "(11) 1234-5678"
  })
  
  db.pedidos.insertOne({
    "id": 1,
    "id_cliente": 1,
    "data_hora": ISODate("2023-06-19T12:00:00"),
    "tipo_entrega": "delivery",
    "total": 35.50
  })
  
  db.pizzas.insertOne({
    "id": 1,
    "nome": "Calabresa",
    "tamanho": "média",
    "preco": 25.00
  })
  
  db.bebidas.insertOne({
    "id": 1,
    "nome": "Coca-Cola",
    "preco": 5.50
  })
  
  db.itens_pedido.insertOne({
    "id": 1,
    "id_pedido": 1,
    "id_pizza": 1,
    "quantidade": 2
  })
  
  

  // Atualização dos dados:
  db.clients.updateOne(
    { "id": 1 },
    { $set: { "endereco": "Rua B, 456" } }
  )
  
  db.pedidos.updateOne(
    { "id": 1 },
    { $set: { "tipo_entrega": "dine-in" } }
  )
  
  db.pizzas.updateOne(
    { "id": 1 },
    { $set: { "preco": 27.50 } }
  )
  
  db.bebidas.updateOne(
    { "id": 1 },
    { $set: { "preco": 6.00 } }
  )
  
  db.itens_pedido.updateOne(
    { "id": 1 },
    { $set: { "quantidade": 3 } }
  )
  
  
  
  // Exclusão dos dados:
  db.clients.deleteOne({ "id": 1 })
  db.pedidos.deleteOne({ "id": 1 })
  db.pizzas.deleteOne({ "id": 1 })
  db.bebidas.deleteOne({ "id": 1 })
  db.itens_pedido.deleteOne({ "id": 1 })
  
  
  
  // Consulta usando Aggregate (join):
  db.pedidos.aggregate([
    {
      $lookup: {
        from: "clients",
        localField: "id_cliente",
        foreignField: "id",
        as: "cliente"
      }
    },
    { $unwind: "$cliente" }
  ])
  
  
  // Consulta usando Aggregate (group by):
  db.itens_pedido.aggregate([
    {
      $group: {
        _id: "$id_pizza",
        totalVendido: { $sum: "$quantidade" }
      }
    }
  ])