const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send({
        ok: "true"
    })
})

app.post('/submit', (req, res) => {
    let data = req.body.data
    console.log(data)
    let Result = cal(data)
    res.send({
        "result": {
            "sum1": Result.result,
            "sum2": Result.total
        }
    })
})

function cal(data1) {
    let data = data1 //เพื่อเวลาโชว์ว่าขายเล่มไหนได้บ้าง
    let setBook = []
    let result = 0
    let total = 0
    let countBook = 0
    let maxValue = findmax(data)
    for (let i = 0; i < 7; i++) {
        setBook[i] = 0
    }

    for (let lo = 0; lo <= maxValue; lo++) {
        //นำค่าหนังสือเข้า sum ที่ละชุดแล้ว นำค่าออกจาก data ทีละชุด
        for (let i = 0; i < data.length; i++) {
            if (data[i] > 0) {
                setBook[i]++
                data[i]--
            }
        }
        //เช็คค่าจำนวนหนังสือแต่ละชุดเพื่อนำไปคำนวนโปรโมชั่น
        for (let su = 0; su <= setBook.length; su++) {
            if (setBook[su] == 1) {
                countBook++
                total = total + 100
            }
        }

        result = result + chPro(countBook)
        countBook = 0
        //clear ค่าของ sum เพื่อไปรับชุดคู่ใหม่ของหนังสือ
        for (let clr = 0; clr <= 7; clr++) { setBook[clr] = 0 }

    }
    showdetail(result, (total - result))
    return { result, total }
}

//ใช้หาว่าจะแบ่ง หนังสือออกเป็นกี่ชุด
function findmax(data) {
    let maxValue = 0
    for (let l = 0; l <= data.length; l++) {
        if (data[l] > maxValue) {
            maxValue = data[l]
        }
    }
    return maxValue
}

//เช็คโปรโมชั่นแล้วคำนวนเป็นเงิน
function chPro(countBook) {
    let sum = 0
    switch (countBook) {
        case 1: sum = 100; break;
        case 2: sum = 200 - (100 * 0.1 * 2); break;
        case 3: sum = 300 - (100 * 0.2 * 3); break;
        case 4: sum = 400 - (100 * 0.3 * 4); break;
        case 5: sum = 500 - (100 * 0.4 * 5); break;
        case 6: sum = 600 - (100 * 0.5 * 6); break;
        case 7: sum = 700 - (100 * 0.6 * 7); break;
    }
    return sum
}

//โชว์ผล
function showdetail(result, discount) {
    console.log("ทั้งหมด = " + (result + discount) + "\n" + "ส่วนลด = " + discount + "\n" + "ทั้งสิ้น = " + result)
}

app.listen(port, () => {
    console.log(`Baan Nai Din\'server is running on localhost:`, port)
})