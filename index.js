const body = document.querySelector("body")
const themeInputs = document.querySelectorAll(".theme-toggle input")
const keyContainer = document.querySelector(".key-container")
const result = document.querySelector(".result")

const keys = [7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "x", "RESET", "="]
const operators = ["+", "-", "x", "/"]

themeInputs.forEach((input) => {
	input.addEventListener("change", () => {
		body.classList.remove("theme-1", "theme-2", "theme-3")
		body.classList.add(`theme-${input.value}`)
	})
})

keys.forEach((item) => (keyContainer.innerHTML += `<button class="key">${item}</button>`))
const keyEls = document.querySelectorAll(".key")

keyEls.forEach((keyBtn, index) => {
	keyBtn.addEventListener("click", () => {
		const key = keys[index]
		const lastChar = result.textContent.slice(-1)

		if (result.textContent === "Invalid input") {
			result.textContent = ""
		}

		if (key === "RESET") {
			return (result.textContent = "")
		}

		if (key === "DEL") {
			return (result.textContent = result.textContent.slice(0, -1))
		}

		if (key === "=") {
			const expression = result.textContent.replace(/x/g, "*")
			try {
				result.textContent = math.evaluate(expression)
			} catch {
				result.textContent = "Invalid input"
			}
			return
		}

		if (operators.includes(key)) {
			if (operators.includes(lastChar)) {
				result.textContent = result.textContent.slice(0, -1)
			}
			return (result.textContent += key)
		}
		result.textContent += key
		result.scrollLeft = result.scrollWidth
	})
})
