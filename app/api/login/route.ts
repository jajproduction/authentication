import prisma from '@/prisma/prisma'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid email and password' }, { status: 401 })
    }

    const { id, type, firstname, lastname } = user

    const response = NextResponse.json({ id, type, firstname, lastname })
    response.cookies.set('type', type, { httpOnly: true, path: '/' })
    return response
  } catch (error) {
    console.error('Login error', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
