import prisma from '@/app/libs/prismadb';
import JWT, { TokenExpiredError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import sendGrid from '@sendgrid/mail';
import recoveryMail from '@/app/utils/email_templates/forgotPassword';

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const { email } = body;

		const existingUser = await prisma.user.findUnique({
			where: { email: email },
		});

		if (!existingUser) {
			return NextResponse.json(
				{ error: 'User is not signed up.' },
				{ status: 403 }
			);
		}
		const emailofExistingUser = existingUser.email;

		const resetToken = JWT.sign(
			{
				email: emailofExistingUser,
			},
			process.env.NEXTAUTH_SECRET!,
			{ expiresIn: '10min' }
		);

		const mail = recoveryMail(email, resetToken);
		sendGrid.setApiKey(process.env.SENDGRID_API as string);
		sendGrid
			.send(mail)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.log('sending failed', error);
			});

		return NextResponse.json(email);
	} catch (error) {
		console.log(error);
	}
}

export async function PATCH(request: Request) {
	try {
		const body = await request.json();
		const { token, password } = body;

		const resetToken = JWT.verify(token, process.env.NEXTAUTH_SECRET!) as any;

		const userEmail = resetToken.email;
		if (!resetToken || !password) return NextResponse.error();

		const hashedPassword = await bcrypt.hash(password, 12);

		await prisma.user.update({
			where: { email: userEmail },
			data: {
				hashedPassword,
			},
		});

		return NextResponse.json({ userEmail, password, hashedPassword });
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			console.log('token has expired');
		}
		console.log(error);
	}
}
