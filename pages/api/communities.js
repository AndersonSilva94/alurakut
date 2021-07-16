import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if (request.method === 'POST') {
    const TOKEN = 'f201a73594dc2f7d6f21ad8e081428';
    const client = new SiteClient(TOKEN);
  
    const createRegister = await client.items.create({
      itemType: '970007',
      ...request.body,
    })
  
    console.log(TOKEN);
    response.json({
      dados: 'Algum dado qualquer',
      createRegister: createRegister,
    });

    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST sim!'
  })
}