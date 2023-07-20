import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { journalEntryValidationSchema } from 'validationSchema/journal-entries';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.journal_entry
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getJournalEntryById();
    case 'PUT':
      return updateJournalEntryById();
    case 'DELETE':
      return deleteJournalEntryById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getJournalEntryById() {
    const data = await prisma.journal_entry.findFirst(convertQueryToPrismaUtil(req.query, 'journal_entry'));
    return res.status(200).json(data);
  }

  async function updateJournalEntryById() {
    await journalEntryValidationSchema.validate(req.body);
    const data = await prisma.journal_entry.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteJournalEntryById() {
    const data = await prisma.journal_entry.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
