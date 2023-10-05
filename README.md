# Test DOT

## Apa studi kasus yang dibuat?

Jadi, studi kasus yang dibuat adalah proses peminjaman buku di perpustakaan oleh user. 

## Siapa aktor di dalam studi kasus ini?

Admin dan User (Peminjam Buku)

## Bagaimana struktur folder?

```
- src/
  - api/
    - feature/
      - feature.controller.ts
      - feature.route.ts
    - ....
   
  - config/
    - config.js
    - database.ts

  - dtos/
    - feature.dto.ts
    -  ....

  -  exceptions/
    - ....
    
  - helpers/
    - ....

  - interfaces/
    - feature.interface.ts
    - ....

  - middlewares/
    - feature.middleware.ts
    - ....

  - migrations/
    - ....

  - models/
    - feature.model.ts
    - ....

  - repositories/
    - feature.repository.ts
    - ....

  - seeders/
    - ....

  - services/
    - feature.service.ts
    - ....

  - utils/
    - ....

  - app.ts

  - server.ts

```

## Teknologi apa yang digunakan?

```
- Node JS - Typescript
- PostgreSQL
- SequelizeJS
- Express
```

## Bagaimana cara menjalankan program?

Digunakan untuk migrasi dan seeding data ke database

```
- npm run or yarn run sq:cms
```

digunakan untuk menjalankan program (karena masih development)

```
npm run or yarn run development
```

## Skenario (Gambaran umum saja)

- Hanya Admin = A
- Hanya User = U
- Admin dan User = AU
- User belum terdaftar N

```
Sesi 1:
1. Admin melakukan login terlebih dahulu (POST /api/auth/signin) AU
2. Admin menambah buku (POST /api/books) A
3. Admin melihat seluruh buku (GET /api/books) AU
4. Admin melihat detail buku (GET /api/books/:id) AU
5. Admin melihat mencari buku berdasarkan nama (GET /api/books/book?name=) AU
6. Admin mengupdate buku (PUT /api/books/:id) A
7. Admin menghapus buku (DELETE /api/books/:id) A

Sesi 2:
1. User mendaftar diri (POST /api/auth/signup) N
2. User melakukan login terlebih dahulu (POST /api/auth/signin) AU
3. User mendapatkan data profile (GET /api/user-profiles/me) AU
4. User melakukan aksi pada sesi 1 untuk nomor: 3, 4, 5

Sesi 3:
1. User meminjam sebuah buku (POST /api/borrow-books) U
2. User mengembalikan sebuah buku (PUT /api/borrow-books) U
3. Admin melihat keseluruhan peminjaman buku yang ada (GET /api/borrow-books) A
4. Admin melihat detail peminjaman buku yang ada (GET /api/borrow-books/:id) A
5. Admin merubah data peminjaman buku yang ada (PUT /api/borrow-books/:id) A
6. User melihat keseluruhan traksasi yang dilakukanya (GET /api/user-profiles/my-transactions) u
7. User melihat detail traksasi yang dilakukanya (GET /api/user-profiles/my-transactions/:id) u
```
