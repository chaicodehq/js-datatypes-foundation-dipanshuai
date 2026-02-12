/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here

  if (Object.prototype.toString.call(thali) !== "[object Object]") return ""
  if (!thali.name && typeof (thali.name !== "string")) return ""
  if (!thali.items && !Array.isArray(thali.items)) return ""
  if (thali.isVeg === undefined) return ""
  if (thali.price === undefined && typeof (thali.price !== "number")) return ""
  let type = "Veg"
  if (!thali.isVeg) type = "Non-Veg"
  return `${thali.name.toUpperCase()} (${type}) - Items: ${thali.items.join(", ")} - Rs.${thali.price}.00`
}

export function getThaliStats(thalis) {
  // Your code here
  if (!Array.isArray(thalis)) return null
  const totalThalis = thalis.length
  if (totalThalis === 0) return null


  const vegThali = thalis.filter(item => item.isVeg == true)
  const vegCount = vegThali.length

  const nonVegCount = totalThalis - vegCount
  const avgPrice = `${thalis.reduce((sum, item) => sum + item.price, 0) / totalThalis}.00`

  const cheapest = Math.min(...thalis.map(item => item.price))
  const costliest = Math.max(...thalis.map(item => item.price))
  const names = thalis.map(item => item.name)


  return { totalThalis, vegCount, nonVegCount, avgPrice, cheapest, costliest, names }

}

export function searchThaliMenu(thalis, query) {
  // Your code here

  if(!Array.isArray(thalis) || typeof(query) !== "string") return []
  return thalis.filter(item => (item.name.toLowerCase()).includes(query.toLowerCase()) || item.items.join().toLowerCase().includes(query.toLowerCase()) )
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if(!Array.isArray(thalis) || typeof(customerName) !== "string" || thalis.length === 0) return ""
  const lineItem = thalis.map(thali => `- ${thali.name} x Rs.${thali.price}`).join("\n")
  const total = thalis.reduce((acc, item) => item.price + acc, 0)
  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItem}\n---\nTotal: Rs.${total}.00\nItems: ${thalis.length}`

}
