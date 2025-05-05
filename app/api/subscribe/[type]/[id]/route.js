// File: /app/api/subscribe/[id]/[type]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, context) {
  const { type, id } = context.params;

  try {
    const userId = parseInt(id);

    let subscription;

    if (type === 'school') {
      subscription = await prisma.subscription.findFirst({
        where: {
          schoolId: userId,
          status: 'ACTIVE',
        },
        include: {
          plan: {
            include: {
              features: true,
            },
          },
        },
      });
    } else if (type === 'tutor') {
      subscription = await prisma.subscription.findFirst({
        where: {
          tutorId: userId,
          status: 'ACTIVE',
        },
        include: {
          plan: {
            include: {
              features: true,
            },
          },
        },
      });
    } else {
      return NextResponse.json({ error: 'Invalid subscription type' }, { status: 400 });
    }

    if (!subscription) {
      return NextResponse.json({ plan: null });
    }

    return NextResponse.json({ plan: subscription.plan });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
