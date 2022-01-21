import fs from "fs";
// import fs from "fs/promises"
import { promisify } from "util";
import path from "path";
import jose from "jose";

const readFile = promisify(fs.readFile);  // fs.readfile from "fs" after promisification is faster than fs.readfile from "fs/promises"

export async function returnPublicKeyPEM () {
    return await readFile(path.resolve(process.cwd(), 'public.pem'), 'utf8')
}

export async function returnPrivateKeyPEM () {
    return await readFile(path.resolve(process.cwd(), 'private.pem'), 'utf8')
}

export async function returnPrivateKeyJWK () {
    return await jose.importJWK({
        "kty": "RSA",
        "n": "ndw7Y9cvVES114m16jm9b9ypDR236N5ljbViosmeQ32-L451kEAQpqBWItVeoulAWq3frT9kanrI6BtW_LIiL2mp0UBfVCWUtbxCyvDVBHEayZO5yFHCRZ2FF6bs7cO61aLBbLukGoXPk9Xd9FnOBSaiVLXU2RAoOYYl65NZj59_WhweTkX_PPdpOLtyglJEaIRhZ4Vogfuqq96DiVcuVq8WYCRLtttpf0shhC0em0i15uhv51_xi4f72MrBlc5iTg2wZnlOPrrUJxoLNCNiTLljhx0qPeehuQy0m5rFTYNOa3Wnxl5s6b9uA-tpdsIQSExIL-oc5Qdo_ET2N52LDTzf-spjshRAE-q785cIilGAvZtJj-aJqBd3jtShiltL9OwBpT_kzJWeuc-6usoeGEkXWbItagEI9SWkmy-jd6zPl4n1AXmLfE8Y3KhJnv4NGv9yEAN536TOzLObllN0w1nfDtCIdf_F6zRRQoGS4gY4KqsQ6L4bfXsemHn-zr7P",
        "e": "AQAB",
        "d": "dLRzx803dWJS2WU68036qi-FX2gAJg39IDXgFR9ffOACceAtNBbY-IcDBz-ddm1hIWj4O3npP_tEeqxzs9_x_AFvBX9Eus4J0g27h5NiuKTxu-MV723aZWMeGS1UbjdM8lIgE8XpfZ49pzrum46lDBPS4TOIh201f8mYUUAfb1noafLtyMpg926mAMY70vMFFgwAgusTJz2qoOOhdTDZ1kYdEbjjrO0rYmtl_PTqcrzfljVzPaglyBUhcNX9JkZsJ2JEupBd1VCObsFgTgaBJMrzapkv_NH0LKESo6vWekBeEghjzLHD77-UmvjvFHrbSKAodOoqTPpwCNPxTbdZsC9BafWIwRve5WndNlBrGGqssnbvPRUBZ6PXcCftEU0xZdRV1z__Xq4Rpc65i_iVWOVeJzu_dgP-mtc2FZN6AlmQe9-u-HmGbjxvIoxqHTXhauzPeywc5qtCeeMACXgeBTxcRIIV94WcwvlYutt05Z1f15m_jn4qrLgAp7YnCzwB",
        "p": "0lu9PumaYGka-uMIWFbQ777PFk0oq0Y6nEZ6R143WE8nVpE5MRdr-LI_YjPlOhBvzhyt21xv88ckZ2SqTw3AYVdBZ8J786rbkqEvPbJqJAosGRt7ULAHjgaN06nQoDM-lgeqKSbYIMmv78bv3JGqCKiRwwVt7FMchbOZD6vu-ivR9awlrI79aZ5Bx8eALeY-9RR6MqSh4hys--JaCKIG92sHDJ-ILPUxMO62GPYtV33vl88ggP0XdjaCtasbpMTP",
        "q": "wByCuqXt0lVxwxNmFuSTdZGQv_AXRH7fuFc1-gUzqhYaRZbykxIx9gE-kzBsRKFattXHmxe4qoe-3adf6LTH2N87y23jIg2wWdMffuhbgOztFjoweHnrk6HCd9HGMAVzcNugGcZIU1x3Yj6wgmOqvqPhyoIgSLlOgGAaImXWqoM4qiUlUqmqnz4uoeLhiZErFCMUL3XDk0lYYoXupQfDA-7LJ28r-RHUJQc71Tic9MJtlga3Cfxd1KAkPl7GKOYB",
        "dp": "i3BIR9WtgU7qlXe85mHV6bW_q_bFiJLq8wA8ueYYJa-CUf29vW7bIWV2YnAn-I9ArY2RKSFjDGLrHKY7xl9FMMEYF-FxLJoLJm011V3Ywb8EcDgpS9kDiP-LL80W_7o4OFcoUlLvXPyUZQqnoLvlzAuBY5bLwKVu-KmOQjckGCzH5mOQLYwzKrm-vODfdI11GhvSzJMYw7tiZy0ppSNSHtuRNqrhJ3v4eYkip_U3JRHTqfugfiBGVxPXHPkpP9U9",
        "dq": "fJ7CCvPyRzwYNPRTiEw0f9KytF-5qDwpQjqIkCxprE70MepOZyspb6y0--Qwh4CoCOy6tBf6Od0e6khWBe2nqj59WmRpL8DzggFbcAaovQR0c7PBl5V3ROhs7y8MQkB292HxBGdEqZbU9s010Q94RnymzqgE60gR7WLp8SBg1XGUA4NfJ7VaMjyzIV688XFTIZfz0ymwec3dYOQCv9k-H0H7VRRf0Q1IsdB0dsdnwbqSPf0TJY4pC_HqMO9n2kYB",
        "qi": "DgTRHWjb6PseE5n9h0gO2wDn8wnfgHi_WRuLV7KMdhP2Nahu0qWBd5iJcpVhYh2k5tkfiKS-0tYHpRXYYJIVVx7x4z00FjQuEcoUwkQj6KBUQehSQA7Kza6MZze5bJsI7gSwdZfFuE30NctxCS3RgI7_krKAuIfBmbGXu00GPqKbE4Fnq6DS_WBchaKfDCGUUXH_kyBTf4iFHH_hs0B9gQMJSk9NxxWtcROEBRJqMvLOqeJ3lWm2zm4UAg4AobJ3"
    }, "RSA256")
}

export async function returnPublicKeyJWK () {
    return await jose.importJWK({
        "kty": "RSA",
        "n": "ndw7Y9cvVES114m16jm9b9ypDR236N5ljbViosmeQ32-L451kEAQpqBWItVeoulAWq3frT9kanrI6BtW_LIiL2mp0UBfVCWUtbxCyvDVBHEayZO5yFHCRZ2FF6bs7cO61aLBbLukGoXPk9Xd9FnOBSaiVLXU2RAoOYYl65NZj59_WhweTkX_PPdpOLtyglJEaIRhZ4Vogfuqq96DiVcuVq8WYCRLtttpf0shhC0em0i15uhv51_xi4f72MrBlc5iTg2wZnlOPrrUJxoLNCNiTLljhx0qPeehuQy0m5rFTYNOa3Wnxl5s6b9uA-tpdsIQSExIL-oc5Qdo_ET2N52LDTzf-spjshRAE-q785cIilGAvZtJj-aJqBd3jtShiltL9OwBpT_kzJWeuc-6usoeGEkXWbItagEI9SWkmy-jd6zPl4n1AXmLfE8Y3KhJnv4NGv9yEAN536TOzLObllN0w1nfDtCIdf_F6zRRQoGS4gY4KqsQ6L4bfXsemHn-zr7P",
        "e": "AQAB"
    }, "RSA256")
}