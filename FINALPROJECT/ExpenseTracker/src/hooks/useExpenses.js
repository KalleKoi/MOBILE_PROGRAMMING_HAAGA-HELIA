import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

const expensesRef = collection(db, 'expenses');

export default function useExpenses() {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const q = query(expensesRef, orderBy('createdAt', 'desc'));

        const unsub = onSnapshot(q, (snapshot) => {
            setExpenses(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );
        });

        return unsub;
    }, []);

    return expenses;
}