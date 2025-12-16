const API_URL = 'http://localhost:5001/api';
const ADMIN_EMAIL = 'admin@demo.com';
const ADMIN_PASSWORD = 'password';

async function runVerification() {
    try {
        console.log('1. Logging in as Admin...');
        const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.statusText}`);
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('✅ Login successful. Token obtained.');

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        console.log('\n2. Fetching Vets (Public)...');
        const getRes = await fetch(`${API_URL}/vets`);
        if (!getRes.ok) throw new Error(`Get Vets failed: ${getRes.statusText}`);
        const vets = await getRes.json();
        console.log(`✅ Fetched ${vets.length} vets.`);

        console.log('\n3. Creating a new Vet (Admin)...');
        const newVet = {
            name: 'Dr. Test Vet',
            specialization: ['General', 'Surgery'],
            clinicName: 'Test Clinic',
            city: 'Test City',
            experience: 5,
            contact: { phone: '1234567890', email: 'test@vet.com' },
            availability: 'Mon-Fri',
            verified: true,
            address: '123 Test St'
        };
        const createRes = await fetch(`${API_URL}/vets`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newVet)
        });
        if (!createRes.ok) throw new Error(`Create Vet failed: ${createRes.statusText}`);
        const createdVet = await createRes.json();
        const createdVetId = createdVet._id;
        console.log('✅ Vet created successfully. ID:', createdVetId);

        console.log('\n4. Updating the Vet (Admin)...');
        const updateData = { ...newVet, experience: 6 };
        const updateRes = await fetch(`${API_URL}/vets/${createdVetId}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(updateData)
        });
        if (!updateRes.ok) throw new Error(`Update Vet failed: ${updateRes.statusText}`);
        const updatedVet = await updateRes.json();
        console.log('✅ Vet updated successfully. New experience:', updatedVet.experience);

        console.log('\n5. Deleting the Vet (Admin)...');
        const deleteRes = await fetch(`${API_URL}/vets/${createdVetId}`, {
            method: 'DELETE',
            headers: headers
        });
        if (!deleteRes.ok) throw new Error(`Delete Vet failed: ${deleteRes.statusText}`);
        console.log('✅ Vet deleted successfully.');

        console.log('\n✨ All backend verifications passed!');

    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        process.exit(1);
    }
}

runVerification();
