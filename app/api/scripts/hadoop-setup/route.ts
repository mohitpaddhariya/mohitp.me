import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  try {
    // Read the script file from the public directory
    const scriptPath = join(process.cwd(), 'public', 'scripts', 'hadoop-setup.sh')
    const scriptContent = readFileSync(scriptPath, 'utf-8')

    // Return the script with proper headers
    return new NextResponse(scriptContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'inline; filename="hadoop-setup.sh"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error reading script file:', error)
    return new NextResponse('Script not found', { status: 404 })
  }
}
