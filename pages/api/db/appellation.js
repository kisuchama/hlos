import prisma from '../../../lib/prisma'

export default async function assetHandler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const appellations = await prisma.appellation.findMany({
          orderBy: [
            {
              hero: {
                id: 'asc',
              },
            },
            {
              caller: {
                id: 'asc',
              }
            },
          ],
          select: {
            appellation: true,
            hero: {
              select: {
                name: true,
                chibi: true,
                hex: true,
              },
            },
            caller: {
              select: {
                name: true,
                chibi: true,
                hex: true,
              },
            },
          },
        })
        res.status(200).json(appellations)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching appellations' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}