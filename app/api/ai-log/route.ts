import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID!;

export async function POST(req: Request) {
  try {
    const { query, answer, date, timestamp } = await req.json();

    if (!query|| !answer || !date || !timestamp) {
      return NextResponse.json({ error: 'Отсутствуют обязательные поля' }, { status: 400 });
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'queries', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[query, answer, date, timestamp]],
      },
    });

    return NextResponse.json({ message: 'Данные успешно добавлены' });
  } catch (error) {
    return NextResponse.json({ error: 'Не удалось добавить данные' }, { status: 500 });
  }
}
