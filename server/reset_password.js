import bcrypt from 'bcrypt';
import prisma from './prisma/index.js';

async function reset() {
    try {
        const passwordHash = await bcrypt.hash('admin123', 10);
        await prisma.user.update({
            where: { email: 'admin@amwajtech.com' },
            data: { passwordHash }
        });
        console.log('Password reset to admin123');
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
reset();
