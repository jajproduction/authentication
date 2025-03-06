import prisma from '@/prisma/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

function getCurrentPhilippineTime() {
  const now = new Date()
  const phtOffset = 8 * 60
  const phtTime = new Date(now.getTime() + phtOffset * 60 * 1000)
  return phtTime
}

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email,
        password: hashedPassword,
        createdAt: getCurrentPhilippineTime(),
        updatedAt: getCurrentPhilippineTime()
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
