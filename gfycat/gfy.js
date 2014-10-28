if (!window.console) {
    console = {
        log: function() {}
    }
}

function handleResponse() {}
var gfyCollection = function() {
    var d = [];

    function b(j, l) {
        window.requestAnimationFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(i) {
                window.setTimeout(i, 0)
            }
        })();
        if (l.getElementsByClassName) {
            return l.getElementsByClassName(j)
        } else {
            var g = [];
            var k = l.getElementsByTagName("*");
            for (var h = 0; h < k.length; h++) {
                if ((" " + k[h].className + " ").indexOf(" " + j + " ") > -1) {
                    g.push(k[h])
                }
            }
            return g
        }
    }

    function c() {
        elem_coll = b("gfyWrapper", document);
        for (var g = 0; g < elem_coll.length; g++) {
            var h = new gfyObject(elem_coll[g]);
            h.init();
            d.push(h)
        }
    }

    function f(h) {
        for (var g = 0; g < d.length; g++) {
            d[g].setTheme(h)
        }
    }

    function a() {
        return d
    }
    return {
        init: c,
        get: a,
        setTheme: f
    }
}();
var gfyObject = function(am) {
    var o = am;
    var bG;
    var V = false;
    var ae;
    var aY;
    var bm;
    var bt;
    var c;
    var a1;
    var ar;
    var aQ;
    var F;
    var bo;
    var N;
    var bk;
    var ac;
    var x;
    var au;
    var t;
    var C;
    var r;
    var bJ;
    var v;
    var bf;
    var aa;
    var k;
    var K;
    var bv;
    var aF;
    var bN = false;
    var bg = false;
    var aH = this;
    var ag;
    var s = 0;
    var Y = 0;
    var bq = 0;
    var aC = 0;
    var at = 0;
    var M = "light";
    var W = 0;
    var bb;
    var S;
    var aP;
    var u;
    var g;
    var ba;
    var E;
    var ai;
    var J;
    var B;
    var bB;
    var bz;
    var aD;
    var D;
    var bn;
    var az;
    var bc = false;
    var a9 = 0;
    var l = false;
    var aB = 20;
    var aA = 20;
    var bH = 6;
    var H = false;
    var aV;
    var aN, aO;
    var a3, a2, aq, ap, aU, aJ, aW, aL;
    var al;
    var bP;
    var br = 0;
    var j = 0;
    var bU = -1;
    var bA = true;
    var af = gfyWidth;
    var a = gfyHeight;
    var bQ = 1;
    var bE = false;

    function ax(bX, bZ) {
        if (bZ.getElementsByClassName) {
            return bZ.getElementsByClassName(bX)
        } else {
            var bV = [];
            var bY = bZ.getElementsByTagName("*");
            for (var bW = 0; bW < bY.length; bW++) {
                if ((" " + bY[bW].className + " ").indexOf(" " + bX + " ") > -1) {
                    bV.push(bY[bW])
                }
            }
            return bV
        }
    }

    function n(bV) {
        J = bV;
        gfyFrameRate = J.frameRate
    }

    function be() {
        W = 1;
        F = document.createElement("video");
        F.className = "gfyVid";
        F.autoplay = true;
        F.loop = true;
        F.controls = false;
        F.style.maxWidth = "100%";
        F.style.position = "relative";
        if (X() - 2 > gfyWidth) {
            F.width = gfyWidth;
            F.height = gfyHeight;
            aa.width = gfyWidth;
            aa.height = gfyHeight
        }
        if (ae) {
            source = document.createElement("source");
            source.src = gfyMp4Url;
            var bW = navigator.userAgent.toLowerCase();
            source.src = source.src.replace(/\.mp4/g, "-android.mp4");
            source.type = "video/mp4";
            source.setAttribute("id", "mp4source");
            F.appendChild(source)
        }
        source2 = document.createElement("source");
        source2.src = gfyWebmUrl;
        source2.type = "video/webm";
        source2.setAttribute("id", "webmsource");
        F.appendChild(source2);
        var bV = ax("ctrlRow", o)[0];
        bz.insertBefore(F, bV);
        F.addEventListener("error", Q, true);
        F.onmouseover = a5;
        F.onmouseout = a0;
        v.style.display = "block";
        bV.style.display = "block";
        a7();
        v.addEventListener("mousedown", bj, false);
        F.addEventListener("mousedown", y, false);
        F.addEventListener("dblclick", bs, false)
    }

    function U() {
        W = 0;
        bo = document.createElement("img");
        bo.className = "gfyGif";
        bo.style.maxWidth = "100%";
        bo.src = gfyGifUrl;
        aa.width = 0;
        aa.height = 0;
        bz.appendChild(bo);
        bo.onmouseover = a5;
        bo.onmouseout = a0;
        bo.addEventListener("mousedown", y, false);
        bo.addEventListener("dblclick", bs, false);
        bo.ondragstart = function() {
            return false
        }
    }

    function bl() {
        B = document.createElement("div");
        B.className = "gfyInfo oTrans oHide";
        stripe = document.createElement("div");
        stripe.className = "gfyInfoDivider";
        B.appendChild(stripe);
        ac = document.createElement("div");
        ac.className = "gfyInfoItem";
        ac.innerHTML = "<span style='font-weight:bold;'>Gif Size: </span> " + d(gfyGifSize);
        B.appendChild(ac);
        gfySize = document.createElement("div");
        gfySize.className = "gfyInfoItem";
        gfySize.innerHTML = "<span style='font-weight:bold;'>Gfy Size: </span> " + d(gfyMp4Size);
        B.appendChild(gfySize);
        r = document.createElement("div");
        r.className = "gfyInfoItem";
        r.innerHTML = "<span style='font-weight:bold;'>Compression: </span> " + Math.round(10 * gfyGifSize / gfyMp4Size) / 10 + " to 1";
        B.appendChild(r);
        t = document.createElement("div");
        t.className = "gfyInfoItem";
        t.innerHTML = "<span style='font-weight:bold;'>Views: </span> " + gfyViews;
        B.appendChild(t);
        o.appendChild(B)
    }

    function q() {
        W = 0;
        var bV = ax("ctrlRow", o)[0];
        bV.style.display = "none";
        v.style.display = "none";
        bz.removeChild(F)
    }

    function a8() {
        bz.removeChild(bo)
    }

    function bw() {
        if (W == 1) {
            if (F.paused) {}
            var bV = F.width;
            var bW = F.height;
            q();
            U();
            z(bV, bW);
            N.src = N.src.replace(/gif/g, "gfy")
        } else {
            var bV = bo.width;
            var bW = bo.height;
            a8();
            be();
            z(bV, bW);
            v.style.display = "block";
            N.src = N.src.replace(/\/gfy/g, "/gif");
            ao()
        }
        bS()
    }

    function bD() {
        a8();
        be()
    }

    function aZ() {
        q();
        U()
    }

    function d(bX) {
        var bW = -1;
        var bV = [" kB", " MB"];
        do {
            bX = bX / 1024;
            bW++
        } while (bX > 1024);
        return Math.max(bX, 0.1).toFixed(1) + bV[bW]
    }

    function by() {
        if (document.selection) {
            var bV = document.body.createTextRange();
            bV.moveToElementText(this);
            bV.select()
        } else {
            if (window.getSelection) {
                var bV = document.createRange();
                bV.selectNode(this);
                window.getSelection().addRange(bV)
            }
        }
    }

    function aj(bW, bY) {
        var bV = document.createElement("script");
        var bX = "_JSONP_callback__" + (++a9);
        bV.src = bW.replace(/=\?/, "=" + bX);
        document.getElementsByTagName("head")[0].appendChild(bV);
        window[bX] = function(bZ) {
            delete window[bX];
            bV.parentElement.removeChild(bV);
            bY(bZ)
        }
    }
    this.checkPending = function() {
        aj("http://tracking.gfycat.com/checkPending/" + gfyName.toLowerCase() + "?callback=?", function(bV) {
            if (typeof bV.complete != "undefined") {
                if (bV.complete == true) {
                    l = true;
                    gfyGifSize = bV.gifSize;
                    ac.innerHTML = "<span style='font-weight:bold;'>Gif Size: </span> " + d(gfyGifSize);
                    r.innerHTML = "<span style='font-weight:bold;'>Compression: </span> " + Math.round(10 * gfyGifSize / gfyMp4Size) / 10 + " to 1";
                    N.onclick = bw;
                    ctrlReverse.onclick = ay;
                    gfyGifUrl = "http://" + bu(gfyGifSize) + "/" + gfyName + ".gif";
                    document.getElementById("gifShareLink").innerHTML = gfyGifUrl;
                    if (bc) {
                        aM();
                        az.innerHTML = "All files are now encoded!"
                    }
                }
            }
        });
        if (!l && a9 < 60 && gfyViews < 10000) {
            setTimeout(function() {
                aH.checkPending()
            }, 10000)
        }
    };

    function bi() {
        var bV = document.getElementById("webmsource").src;
        if (bV.indexOf("zippy") > -1) {
            ai = "#99cf2c";
            dotRed = 50;
            dotGreen = 105;
            dotBlue = 0
        } else {
            if (bV.indexOf("fat") > -1) {
                ai = "#fdc428";
                dotRed = 210;
                dotGreen = 153;
                dotBlue = 0
            } else {
                dotRed = 163;
                dotGreen = 7;
                dotBlue = 0;
                ai = "#cd312a"
            }
        }
    }

    function bu(bV) {
        if (bV < 1048576) {
            return "zippy.gfycat.com"
        } else {
            if (bV < 3145728) {
                return "fat.gfycat.com"
            } else {
                return "giant.gfycat.com"
            }
        }
    }

    function av(bW) {
        if (typeof gfyMp4Size === "undefined") {
            return bi()
        }
        var bV;
        if (bW == true) {
            bV = gfyGifSize
        } else {
            bV = gfyMp4Size
        }
        if (bV < 1000000) {
            ai = "#99cf2c";
            dotRed = 50;
            dotGreen = 105;
            dotBlue = 0
        } else {
            if (bV < 2000000) {
                ai = "#fdc428";
                dotRed = 210;
                dotGreen = 153;
                dotBlue = 0
            } else {
                dotRed = 163;
                dotGreen = 7;
                dotBlue = 0;
                ai = "#cd312a"
            }
        }
    }

    function b(bW, bV) {
        return (" " + bW.className + " ").indexOf(" " + bV + " ") > -1
    }

    function O(bW, bV) {
        bW.className = bW.className.replace(/(^\s+|\s+$)/g, "");
        return b(bW, bV) ? false : (bW.className += " " + bV)
    }

    function a6(bW, bV) {
        return bW.className = (" " + bW.className + " ").replace(" " + bV + " ", " ")
    }

    function aw() {
        var bV = false;
        (function(bW) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|android|ipad|playbook|silk|blackberry|htc|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(bW) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(bW.substr(0, 4))) {
                bV = true
            }
        })(navigator.userAgent || navigator.vendor || window.opera);
        return bV
    }

    function X() {
        if (window.outerWidth) {
            return window.outerHeight
        } else {
            return document.body.clientWidth
        }
    }

    function bM() {
        W = 1;
        o.style.display = "block";
        aa = ax("gfyPreLoadCanvas", o)[0];
        ae = aw();
        bm = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
        aY = document.getElementById("gfyAccountID520");
        F = ax("gfyVid", o)[0];
        if (!aY) {
            F.style.display = "block";
            N = ax("gfyVidLinkButton", o)[0];
            N.onclick = bw
        }
        bG = document.getElementById("adWrapper");
        D = document.getElementById("mobilePlayVid");
        bn = document.getElementById("mobilePlayGif");
        c = ax("gfyCtrlBox2", o)[0];
        a1 = ax("gfyCtrlPause", o)[0];
        ar = ax("gfyCtrlSlower", o)[0];
        aQ = ax("gfyCtrlFaster", o)[0];
        ctrlReverse = ax("gfyCtrlReverse", o)[0];
        bJ = ax("gfyDotCanvas", o)[0];
        v = ax("gfyJogCanvas", o)[0];
        bf = ax("longInfoItem", o)[0];
        bb = ax("gfyShareButton", o)[0];
        aP = ax("gfyGearButton", o)[0];
        S = ax("gfyShareLinks", o)[0];
        u = ax("gfyOptions", o)[0];
        ba = document.getElementById("moon");
        g = document.getElementById("sun");
        E = document.getElementById("gfyTheme");
        B = ax("gfyInfo", o)[0];
        bz = ax("vidWrapper", o)[0];
        aD = document.getElementById("adWrapper");
        ac = document.getElementById("infoGifSize");
        r = document.getElementById("infoCompression");
        bB = ax("gfyTitle", o)[0];
        gfyTitleEdit = document.getElementById("titleedit");
        shareLinkTextArr = ax("gfyShareLinkText", o);
        for (var bY = 0; bY < shareLinkTextArr.length; bY++) {
            shareLinkTextArr[bY].onclick = by
        }
        c.onmouseover = h;
        c.onmouseout = bT;
        o.onmouseover = a5;
        o.onmouseout = a0;
        a1.onclick = A;
        ar.onclick = I;
        aQ.onclick = ab;
        ctrlReverse.onclick = ay;
        av();
        if (bb) {
            bb.onclick = an
        }
        aP.onclick = aI;
        ba.onclick = aE;
        g.onclick = aE;
        if (ae) {
            F.controls = true;
            var bV = document.getElementById("mp4source");
            bV.src = bV.src.replace(/\.mp4/g, "-android.mp4");
            bV.addEventListener("error", function(b1) {
                at++;
                if (at < 4) {
                    F.load();
                    F.play()
                }
            });
            var bW = document.getElementById("webmsource");
            bW.parentNode.removeChild(bW);
            buttons = document.getElementById("mobileButtons");
            buttons.style.display = "block";
            D.onclick = doMobilePlayVid;
            bn.onclick = doMobilePlayGif;
            N.style.display = "none";
            orientationChange();
            window.addEventListener("orientationchange", orientationChange);
            try {
                v.parentNode.removeChild(v);
                c.parentNode.removeChild(c);
                N.parentNode.removeChild(N);
                aP.parentNode.removeChild(aP);
                bb.parentNode.removeChild(bb);
                u.parentNode.removeChild(u);
                S.parentNode.removeChild(S)
            } catch (b0) {}
            var bX = navigator.userAgent.toLowerCase();
            if (bX.indexOf("android") > -1) {
                F.preload = "none";
                F.loop = false;
                F.addEventListener("load", function() {
                    F.play()
                }, false);
                F.addEventListener("ended", function() {
                    F.currentTime = -0.5;
                    F.play()
                }, false)
            }
        } else {
            v.style.display = "block";
            v.onmouseover = ak;
            v.onmouseout = bx;
            var bX = navigator.userAgent.toLowerCase();
            if (bX.indexOf("msie") > -1) {
                F.loop = false;
                F.addEventListener("ended", function() {
                    F.currentTime = 0;
                    F.play();
                    P()
                }, false)
            }
            if (!aY) {
                buttons = document.getElementById("mobileButtons");
                buttons.style.display = "none";
                F.style.display = "block";
                buttons.parentNode.removeChild(buttons);
                D.parentNode.removeChild(D);
                bn.parentNode.removeChild(bn);
                aa.width = gfyWidth;
                aa.height = gfyHeight;
                if (gfyGifSize == 0) {
                    ac.innerHTML = "Gif Size: Pending";
                    r.innerHTML = "Compression: Pending";
                    N.onclick = ad;
                    ctrlReverse.onclick = bd;
                    setTimeout(function() {
                        aH.checkPending()
                    }, 2000)
                }
                if (!document.createElement("video").canPlayType) {
                    q();
                    U();
                    N.src = N.src.replace(/gif-icon/g, "mobile-film-icon");
                    O(N, "oShow");
                    a6(N, "oHide")
                } else {
                    var bZ = gfyParams.getURLParameters("format");
                    if (bZ == "gif") {
                        bw()
                    } else {
                        v.addEventListener("mousedown", bj, false);
                        F.addEventListener("mousedown", y, false);
                        F.addEventListener("dblclick", bs, false);
                        aH.drawLoadingBeat()
                    }
                }
            }
        }
    }

    function G() {
        var bX = document.createElement("canvas");
        bX.height = gfyHeight;
        bX.width = gfyWidth;
        var bW = bX.getContext("2d");
        bW.drawImage(F, 0, 0, gfyWidth, gfyHeight);
        var bY = document.createElement("a");
        var bV = bK();
        bY.download = gfyName + bV + ".png";
        bY.href = bX.toDataURL();
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            bY.dispatchEvent(e)
        } else {
            if (bY.fireEvent) {
                bY.fireEvent("onclick")
            }
        }
    }

    function bs(bY) {
        bQ++;
        bQ = bQ % 2;
        window.scrollTo(0, 0);
        switch (bQ) {
            case 1:
                af = F.width;
                a = F.height;
                z(gfyWidth, gfyHeight);
                break;
            case 0:
                var bW = window,
                    bZ = document,
                    bY = bZ.documentElement,
                    bX = bZ.getElementsByTagName("body")[0],
                    bV = bW.innerWidth || bY.clientWidth || bX.clientWidth,
                    b0 = bW.innerHeight || bY.clientHeight || bX.clientHeight;
                af = F.width;
                a = F.height;
                if ((b0 / gfyHeight) * gfyWidth < bV) {
                    z(gfyWidth * ((b0 - 35) / gfyHeight), b0 - 35)
                } else {
                    z(bV - 35, gfyHeight * ((bV - 35) / gfyWidth))
                }
                break
        }
        a3 = null;
        window.removeEventListener("mousemove", R, false);
        window.removeEventListener("mouseup", ah);
        window.addEventListener("mousemove", R);
        window.addEventListener("mouseup", ah)
    }

    function y(bX) {
        if (bX.which !== 1) {
            return
        }
        var bW = Math.pow;
        var bV = bX.currentTarget.getBoundingClientRect();
        a3 = bX.clientX;
        a2 = bX.clientY;
        if (W) {
            activeDragSX = F.width;
            activeDragSY = F.height
        } else {
            activeDragSX = bo.width;
            activeDragSY = bo.height
        }
        aU = bV.left + bV.width / 2;
        aJ = bV.top + bV.height / 2;
        aW = bX.clientX;
        aL = bX.clientY;
        window.addEventListener("mousemove", R);
        window.addEventListener("mouseup", ah)
    }

    function ah(bV) {
        if (bV.which !== 1) {
            return
        }
        a3 = null
    }

    function R(bW) {
        if (!a3) {
            return
        }
        if (F.hasAttribute("controls")) {
            var bV = bW.target.getBoundingClientRect();
            if ((bV.height - 40) < (bW.clientY - bV.top)) {
                return true
            }
        }
        if (j < 3 && aS()) {
            localStorage.setItem("animPlayCount", 4)
        }
        if (aN) {
            window.cancelAnimationFrame(aN)
        }
        aN = window.requestAnimationFrame(function() {
            var bX = Math.pow;
            var b1 = bW.clientX;
            var bY = bW.clientY;
            var b9 = activeDragSX;
            var b6 = activeDragSY;
            var b4 = bW.clientX - a3;
            var b3 = bW.clientY - a2;
            var b8 = (1 + b4 / b9);
            var b0 = (1 + b3 / b6);
            var bZ = Math.max(b8, b0);
            var b2 = bX(bX(b4, 2) + bX(b3, 2), 0.5);
            var b5 = bX(bX(aW - aU, 2) + bX(aL - aJ, 2), 0.5);
            var b7 = bX(bX(b1 - aU, 2) + bX(bY - aJ, 2), 0.5);
            bZ = (1 + b2 / b9);
            bZ = b7 / b5;
            z(Math.round(activeDragSX * bZ), Math.round(activeDragSY * bZ));
            document.getSelection().removeAllRanges();
            aN = null
        })
    }

    function z(bV, bW) {
        if (bV < 0.25 * gfyWidth) {
            return
        }
        if (W) {
            F.width = bV;
            F.height = bW
        } else {
            bo.width = bV;
            bo.height = bW
        }
        var bX = Math.round(bV);
        var bY = Math.round(bW);
        o.style.width = bX + 40 + "px";
        o.style.height = bY + 60 + "px";
        B.style.top = bY - 4 + "px";
        B.style.width = bX - 87 + "px";
        S.style.left = bX + 20 + "px";
        u.style.left = bX + 20 + "px";
        p()
    }

    function p() {
        if (bE) {
            return
        }
        if ((F.width - 300) / 2 < 10 + parseInt(bf.offsetWidth)) {
            aD.style.top = B.offsetHeight - 50 + "px";
            if (F.width > 1) {
                bE = true
            }
        } else {
            aD.style.top = "0"
        }
    }

    function f(bX) {
        var bV = F.getBoundingClientRect();
        var bW = Math.pow;
        if (!a3) {
            return -1
        }
        if (bV.left >= bX.clientX || bV.top >= bX.clientY) {
            return -1
        }
        return Math.max(bW(bW((bX.clientX - (bV.left + bV.width / 2)), 2) + bW((bX.clientY - (bV.top + bV.height / 2)), 2), 0.5) / aO, 0.25)
    }
    this.Anim = function() {
        br++;
        if (br <= 40) {
            aa.style.display = "block";
            aa.style.webkitFilter = "none";
            var bW = aa.getContext("2d");
            var bV = aa.width;
            var bX = aa.height;
            if (bV > 160 && bX > 160) {
                if (br <= 37) {
                    L = br
                } else {
                    L = 37 - (br - 37)
                }
                bW.clearRect(0, 0, bV, bX);
                bW.beginPath();
                bW.lineWidth = 0;
                bW.fillStyle = "rgba(255,255,255,0.5)";
                bW.fillRect(bV / 2 - 80, bX / 2 - 80, 160, 160);
                bW.strokeStyle = "#444";
                bW.lineWidth = 2;
                bW.moveTo(bV / 2, bX / 2);
                bW.lineTo(bV / 2 - L * 2, bX / 2 - L * 2);
                bW.stroke();
                bW.lineTo(bV / 2 - L * 2, bX / 2 - L * 2 + 9);
                bW.stroke();
                bW.moveTo(bV / 2 - L * 2, bX / 2 - L * 2);
                bW.lineTo(bV / 2 - L * 2 + 9, bX / 2 - L * 2);
                bW.stroke();
                bW.moveTo(bV / 2, bX / 2);
                bW.lineTo(bV / 2 + L * 2, bX / 2 + L * 2);
                bW.stroke();
                bW.lineTo(bV / 2 + L * 2 - 9, bX / 2 + L * 2);
                bW.stroke();
                bW.moveTo(bV / 2 + L * 2, bX / 2 + L * 2);
                bW.lineTo(bV / 2 + L * 2, bX / 2 + L * 2 - 9);
                bW.stroke();
                bW.font = "bold 18pt Arial";
                bW.fillStyle = "#666";
                bW.save();
                bW.translate(bV / 2 + 10, bX / 2);
                bW.rotate(+Math.PI / 4);
                bW.textAlign = "center";
                bW.fillText("Drag to zoom", 0, 0);
                bW.restore()
            }
            aB = br * 2;
            aA = br * 2
        } else {
            if (br <= 80) {
                mCnt = (br - 40) % 20;
                if (mCnt <= 10) {
                    var bY = (40 + (mCnt)) * Math.PI / 180
                } else {
                    var bY = (60 - (mCnt)) * Math.PI / 180
                }
                aB = Math.cos(bY) * 80;
                aA = Math.sin(bY) * 80
            } else {
                if (br < 120) {
                    var bY = 45 * Math.PI / 180;
                    aB = Math.cos(bY) * (80 - 2 * (br - 80));
                    aA = Math.sin(bY) * (80 - 2 * (br - 80))
                }
            }
        }
        if (br < 180) {
            a7();
            setTimeout(function() {
                aH.Anim()
            }, 5)
        } else {
            aa.style.display = "none";
            setTimeout(function() {
                aH.jogSnapBack()
            }, 1);
            br = 0
        }
    };

    function bj(bV) {
        window.removeEventListener("mousemove", bI, false);
        showGfyExtras();
        bP = F.paused;
        F.pause();
        var bW = v.getBoundingClientRect();
        mouseX = (bV.clientX - bW.left) * (v.width / bW.width);
        mouseY = (bV.clientY - bW.top) * (v.height / bW.height);
        H = true;
        if (H) {
            window.addEventListener("mousemove", bC, false)
        }
        var bW = v.getBoundingClientRect();
        aB = (bV.clientX - bW.left) * (v.width / bW.width);
        aA = (bV.clientY - bW.top) * (v.height / bW.height);
        a7();
        v.removeEventListener("mousedown", bj, false);
        window.addEventListener("mouseup", bR, false);
        if (bV.preventDefault) {
            bV.preventDefault()
        } else {
            if (bV.returnValue) {
                bV.returnValue = false
            }
        }
        return false
    }

    function bR(bV) {
        if (!bP) {
            F.play()
        }
        hideGfyExtras();
        v.addEventListener("mousedown", bj, false);
        window.removeEventListener("mouseup", bR, false);
        if (H) {
            window.removeEventListener("mousemove", bC, false)
        }
        H = false;
        aV = Math.sqrt(Math.pow(aB, 2) + Math.pow(aA, 2));
        setTimeout(function() {
            aH.jogSnapBack()
        }, 1)
    }
    this.jogSnapBack = function() {
        var bV = Math.atan2(aA, aB);
        if (aV > 20) {
            aV = aV - 7;
            aB = Math.cos(bV) * aV;
            aA = Math.sin(bV) * aV;
            a7();
            setTimeout(function() {
                aH.jogSnapBack()
            }, 5)
        } else {
            aB = 20;
            aA = 20;
            a7()
        }
    };

    function bI(bW) {
        return;
        a6(v, "oHide");
        O(v, "oShow");
        var bX = v.getBoundingClientRect();
        mouseX = (bW.clientX - bX.left) * (v.width / bX.width);
        mouseY = (bW.clientY - bX.top) * (v.height / bX.height);
        var bV = v.getContext("2d");
        bV.clearRect(0, 0, 600, 600);
        bV.beginPath();
        bV.strokeStyle = "#777";
        bV.lineWidth = 2;
        bV.moveTo(mouseX + 2, mouseY);
        bV.lineTo(mouseX + 7, mouseY);
        bV.stroke();
        bV.moveTo(mouseX - 2, mouseY);
        bV.lineTo(mouseX - 7, mouseY);
        bV.stroke();
        bV.moveTo(mouseX, mouseY + 2);
        bV.lineTo(mouseX, mouseY + 7);
        bV.stroke();
        bV.moveTo(mouseX, mouseY - 2);
        bV.lineTo(mouseX, mouseY - 7);
        bV.stroke()
    }

    function bC(bV) {
        var b0;
        var bZ;
        if (bU < 10 && aS()) {
            localStorage.setItem("ballNoticeCount", 10)
        }
        bU = 10;
        var bY = v.getBoundingClientRect();
        mouseX = (bV.clientX - bY.left) * (v.width / bY.width);
        mouseY = (bV.clientY - bY.top) * (v.height / bY.height);
        b0 = mouseX;
        b0 = (b0 < bH) ? bH : ((b0 > 600 - bH) ? 600 - bH : b0);
        bZ = mouseY;
        bZ = (bZ < bH) ? bH : ((bZ > 600 - bH) ? 600 - bH : bZ);
        aB = b0;
        aA = bZ;
        var bW = Math.atan2(aB - bH, aA - bH) * 2 / Math.PI;
        if (bW < 0) {
            bW = 0
        }
        var bX = bW * (gfyNumFrames / gfyFrameRate);
        if (bX > F.duration) {
            F.currentTime = F.duration - 0.25 / gfyFrameRate
        } else {
            F.currentTime = bX
        }
        a7();
        if (bP) {
            bS()
        }
    }

    function bK() {
        var bV = Math.ceil(F.currentTime * gfyFrameRate);
        return bV
    }

    function a7() {
        var b7 = Math.sqrt(Math.pow(aB - 20, 2) + Math.pow(aA - 20, 2));
        bH = 20;
        if (b7 <= 68) {
            bH = 7 + (b7 - 6) / 5
        }
        var b8 = v.getContext("2d");
        b8.clearRect(0, 0, 600, 600);
        if (b7 > 10) {
            b8.beginPath();
            b8.fillStyle = "#777";
            b8.arc(20, 20, 6, 0, Math.PI * 2, false);
            b8.lineTo(10, 10);
            b8.closePath();
            b8.fill()
        }
        b8.beginPath();
        b8.fillStyle = "#99cf2c";
        b8.arc(aB, aA, bH, 0, Math.PI * 2, false);
        b8.lineTo(aB, aA);
        b8.closePath();
        b8.fill();
        if (bh()) {
            b8.beginPath();
            b8.font = "bold 25pt Arial";
            b8.fillStyle = "#ddd";
            b8.fillText("Click here and drag", 100, 90);
            b8.beginPath();
            b8.strokeStyle = "#ddd";
            var bX = 109;
            var b3 = 0.3253;
            var bZ = 1.027;
            b8.arc(0, 0, bX, b3, bZ, false);
            b8.lineWidth = 3;
            b8.stroke();
            var b1 = 5;
            b8.beginPath();
            var b6 = Math.cos(b3) * bX;
            var b5 = Math.sin(b3) * bX;
            b8.moveTo(b6, b5);
            var b2 = Math.atan2(0 - b6, b5 - 0);
            var bY = b6 + b1 * Math.cos(b2);
            var bW = b5 + b1 * Math.sin(b2);
            b8.lineTo(bY, bW);
            b8.lineTo(bY - b1 * Math.cos(b2 - 0.2618), bW - b1 * Math.sin(b2 - 0.2618));
            b8.arcTo(bY, bW, bY - b1 * Math.cos(b2 + 0.2618), bW - b1 * Math.sin(b2 + 0.2618), b1 - 2);
            b8.lineTo(bY, bW);
            b8.stroke();
            b8.fill();
            b8.beginPath();
            b6 = Math.cos(bZ) * bX;
            b5 = Math.sin(bZ) * bX;
            b8.moveTo(b6, b5);
            b2 = Math.atan2(0 - b6, b5 - 0);
            bY = b6 - b1 * Math.cos(b2);
            bW = b5 - b1 * Math.sin(b2);
            b8.lineTo(bY, bW);
            b8.lineTo(bY + b1 * Math.cos(b2 - 0.2618), bW + b1 * Math.sin(b2 - 0.2618));
            b8.arcTo(bY, bW, bY + b1 * Math.cos(b2 + 0.2618), bW + b1 * Math.sin(b2 + 0.2618), b1 - 2);
            b8.lineTo(bY, bW);
            b8.stroke();
            b8.fill()
        }
        var b0 = Math.atan2(aA, aB);
        if (b7 > 40) {
            b8.font = 15 + "px Arial";
            b8.fillStyle = "#efefef";
            var b4 = bK();
            var bV = 7;
            if (b4 >= 100) {
                bV = 13
            } else {
                if (b4 >= 1000) {
                    bV = 20
                }
            }
            b8.fillText(b4, aB - bV, aA + 4);
            b8.beginPath();
            b8.moveTo(20, 20);
            b8.strokeStyle = "#777";
            b8.lineWidth = 4;
            b8.lineTo(aB - 25 * Math.cos(b0), aA - 25 * Math.sin(b0));
            b8.stroke()
        }
    }

    function aM() {
        az = document.createElement("div");
        az.style.width = "200px";
        az.style.padding = "18px";
        az.style.zIndex = "300";
        az.style.fontSize = "14px";
        az.style.fontFamily = "Helvetica,Arial,sans-serif";
        az.style.backgroundColor = "#263642";
        az.style.color = "#ffffff";
        az.style.position = "absolute";
        az.style.top = "0px";
        az.style.right = "40px";
        o.appendChild(az);
        az.addEventListener("mouseover", function() {
            this.parentElement.removeChild(this)
        })
    }

    function ad() {
        bc = true;
        aM();
        az.innerHTML = "Please wait a few minutes and try again. The gif and other files are currently being encoded. Stay on the page and we will notify you when complete!"
    }

    function bd() {
        bc = true;
        aM();
        az.innerHTML = "Please wait a few minutes and try again to see reverse view.  Some files are currently being encoded. Stay on the page and we will notify you when complete!"
    }

    function bO() {
        if (V || ae) {
            return
        }
        if (adFile == "chitika") {
            var bV = '<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="300" height="250" src="/ads/chitika.html"></iframe>';
            var bW = document.getElementById("adIFrameDiv");
            if (bW != null) {
                bW.innerHTML = bV
            }
        } else {
            if (adFile == "plugrush") {
                var bV = '<iframe frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="300" height="250" src="/ads/plugrush.html"></iframe>';
                var bW = document.getElementById("adIFrameDiv");
                if (bW != null) {
                    bW.innerHTML = bV
                }
            }
        }
    }
    orientationChange = function() {
        switch (window.orientation) {
            case -90:
            case 90:
                buttons = document.getElementById("mobileButtons");
                if (buttons === null) {
                    F.style.marginLeft = "0"
                } else {
                    F.style.marginLeft = "-1000px"
                }
                break;
            default:
                F.style.marginLeft = "0";
                break
        }
    };
    doMobilePlayVid = function() {
        F.style.marginLeft = "0";
        F.style.display = "block";
        buttons = document.getElementById("mobileButtons");
        if (buttons) {
            buttons.parentNode.removeChild(buttons)
        }
        F.play()
    };
    doMobilePlayGif = function() {
        buttons = document.getElementById("mobileButtons");
        if (buttons) {
            buttons.parentNode.removeChild(buttons)
        }
        bw()
    };
    showGfyExtras = function() {
        try {
            clearTimeout(ag);
            ag = false;
            O(bb, "oShow");
            O(aP, "oShow");
            O(B, "oShow");
            O(N, "oShow");
            O(c, "oShow");
            O(bJ, "oShow");
            O(v, "oShow");
            a6(bb, "oHide");
            a6(aP, "oHide");
            a6(B, "oHide");
            a6(N, "oHide");
            a6(c, "oHide");
            a6(bJ, "oHide");
            a6(v, "oHide");
            al = true;
            p();
            if (bq) {
                O(S, "oShow");
                a6(S, "oHide");
                S.style.display = "block"
            }
            aX()
        } catch (bV) {}
    };
    hideGfyExtras = function() {
        try {
            O(bb, "oHide");
            O(aP, "oHide");
            if (gfyTitleEdit && gfyTitleEdit.innerHTML == "OPTIONAL: Type in a title here...") {} else {
                O(B, "oHide");
                a6(B, "oShow")
            }
            O(N, "oHide");
            O(c, "oHide");
            O(S, "oHide");
            al = false;
            p();
            if (!bh()) {}
            a6(bb, "oShow");
            a6(aP, "oShow");
            a6(N, "oShow");
            a6(c, "oShow");
            a6(S, "oShow");
            if (!ag) {
                ag = setTimeout(function() {
                    ag = false;
                    S.style.display = "none"
                }, 1000)
            }
            if (!Y) {
                O(bJ, "oHide");
                a6(bJ, "oShow")
            }
            O(u, "oHide");
            a6(u, "oShow");
            O(S, "oHide");
            a6(S, "oShow");
            O(bz, "vidRight");
            a6(bz, "vidLeft");
            c.style.marginRight = "0px";
            aC = false;
            bq = false;
            S.style.display = "none";
            u.style.display = "none";
            aX()
        } catch (bV) {}
    };

    function bh() {
        return false;
        if (bU < 0) {
            if (aS()) {
                if (!localStorage.getItem("ballNoticeCount")) {
                    localStorage.setItem("ballNoticeCount", 1);
                    bU = 1
                } else {
                    bU = parseInt(localStorage.getItem("ballNoticeCount"));
                    bU = bU + 1;
                    localStorage.setItem("ballNoticeCount", bU)
                }
            }
        }
        if (bU < 0 || bU > 9) {
            return false
        } else {
            return true
        }
    }
    this.checkGfyExtras = function() {
        if (bv || k || K || H) {} else {
            hideGfyExtras()
        }
    };

    function aR(bV) {
        if (bV == "light") {
            M = "light";
            E.href = "//assets.gfycat.com/css/light_theme.css";
            ba.src = "//assets.gfycat.com/img/moon_off.png";
            g.src = "//assets.gfycat.com/img/sun_on.png"
        } else {
            if (bV == "dark") {
                M = "dark";
                E.href = "//assets.gfycat.com/css/dark_theme.css";
                ba.src = "//assets.gfycat.com/img/moon_on.png";
                g.src = "//assets.gfycat.com/img/sun_off.png"
            }
        }
    }

    function aE() {
        if (M == "dark") {
            if (aS()) {
                localStorage.setItem("gfyTheme", "light")
            }
            aR("light")
        } else {
            if (aS()) {
                localStorage.setItem("gfyTheme", "dark")
            }
            aR("dark")
        }
    }

    function aI() {
        if (aC) {
            O(u, "oHide");
            a6(u, "oShow");
            O(bz, "vidRight");
            a6(bz, "vidLeft");
            c.style.marginRight = "0px";
            aC = false;
            u.style.display = "none"
        } else {
            u.style.display = "block";
            var bV = 0 - F.width;
            O(bz, "vidLeft");
            a6(bz, "vidRight");
            c.style.marginRight = "480px";
            O(u, "oShow");
            a6(u, "oHide");
            O(S, "oHide");
            a6(S, "oShow");
            bq = false;
            aC = true;
            S.style.display = "none"
        }
        aX()
    }

    function an() {
        if (bq) {
            O(S, "oHide");
            a6(S, "oShow");
            O(bz, "vidRight");
            a6(bz, "vidLeft");
            c.style.marginRight = "0px";
            bq = false;
            S.style.display = "none"
        } else {
            S.style.display = "block";
            var bV = 0 - F.width;
            O(bz, "vidLeft");
            a6(bz, "vidRight");
            c.style.marginRight = "480px";
            O(S, "oShow");
            a6(S, "oHide");
            O(u, "oHide");
            a6(u, "oShow");
            aC = false;
            bq = true
        }
        aX()
    }

    function aX() {
        setTimeout(function() {
            O(o, "foo");
            a6(o, "foo")
        }, 10)
    }

    function aS() {
        var bW = "test";
        try {
            localStorage.setItem(bW, bW);
            localStorage.removeItem(bW);
            return true
        } catch (bV) {
            return false
        }
    }

    function a5() {
        if (aF) {
            return
        }
        if (bA) {}
        bA = false;
        bv = 1;
        showGfyExtras()
    }

    function a0() {
        bv = 0;
        setTimeout(function() {
            aH.checkGfyExtras()
        }, 1000)
    }

    function ak() {
        window.addEventListener("mousemove", bI, false);
        K = 0;
        aF = 1
    }

    function bx() {
        window.removeEventListener("mousemove", bI, false);
        aF = 0
    }

    function bF() {
        k = 1;
        T()
    }

    function h() {
        if (!aF) {
            K = 1
        }
    }

    function bT() {
        K = 0
    }

    function aT() {
        F.pause();
        window.addEventListener("keydown", aK);
        a1.style.backgroundPosition = "-71px 0";
        ar.style.backgroundPosition = "0 0";
        ar.style.marginLeft = "6px";
        aQ.style.backgroundPosition = "-192px 0";
        aQ.style.width = "8px";
        ar.parentNode.href = "#";
        aQ.parentNode.href = "#";
        aQ.onclick = bp;
        ar.onclick = i
    }

    function a4() {
        F.play();
        window.removeEventListener("keydown", aK);
        a1.style.backgroundPosition = "-95px 0";
        aQ.style.backgroundPosition = "-20px 0";
        ar.style.backgroundPosition = "-165px 0";
        aQ.style.width = "14px";
        ar.style.marginLeft = "0px";
        aQ.onclick = ab;
        ar.onclick = I
    }

    function A() {
        if (F.paused) {
            a4()
        } else {
            aT()
        }
        bS()
    }

    function aK(bV) {
        bV = bV || window.event;
        switch (bV.keyCode) {
            case 37:
                i();
                bV.preventDefault();
                break;
            case 39:
                bp();
                bV.preventDefault();
                break
        }
    }

    function Z() {
        var bY = this.parentNode.parentNode.parentNode;
        var bV = bY.getElementsByTagName("video")[0];
        var bX = -0.125;
        bV.pause();
        bV.setAttribute("data-playbackRate", setInterval((function bW() {
            bV.currentTime += bX;
            if (bV.currentTime <= 0.126) {
                bV.currentTime = bV.duration
            }
            return bW
        })(), 125))
    }

    function ay() {
        a1.style.backgroundPosition = "-95px 0";
        ar.style.backgroundPosition = "0 0";
        ar.style.marginLeft = "6px";
        aQ.style.backgroundPosition = "-192px 0";
        aQ.style.width = "8px";
        ar.parentNode.href = "#";
        aQ.parentNode.href = "#";
        aQ.onclick = bp;
        ar.onclick = i;
        F.pause();
        var bV = document.getElementById("mp4source");
        var bW = document.getElementById("webmsource");
        if (bN) {
            ctrlReverse.style.backgroundPosition = "-46px 0";
            if (bV) {
                bV.src = bV.src.replace(/-reverse\.mp4/g, ".mp4")
            }
            bW.src = bW.src.replace(/-reverse\.webm/g, ".webm");
            bN = false
        } else {
            if (bV) {
                bV.src = bV.src.replace(/-android/g, "");
                bV.src = bV.src.replace(/\.mp4/g, "-reverse.mp4")
            }
            bW.src = bW.src.replace(/\.webm/g, "-reverse.webm");
            ctrlReverse.style.backgroundPosition = "-141px 0";
            bN = true
        }
        F.playbackRate = 1;
        bS();
        F.load();
        F.play();
        aH.drawLoadingBeat()
    }

    function Q(bV) {
        if (F.networkState == HTMLMediaElement.NETWORK_NO_SOURCE) {
            o.style.backgroundColor = "rgb(242,222,222)";
            o.style.borderColor = "rgb(238,211,215)";
            o.style.borderStyle = "solid";
            o.style.borderWidth = "1px";
            o.style.padding = "10px";
            o.style.color = "rgb(185, 74, 72)";
            if (bN && gfyViews < 2) {
                o.innerHTML = "Well this is awkward. We don't have reverse for you yet!<br>Reverse takes a minute or two to generate after you first publish a gif. Try the direct link: <a href='" + gfyMp4Url.replace(/\.mp4/g, "-reverse.mp4") + "'>here</a>.<br><br>(Now that your browser thinks the file is missing, its not going to cooperate until you follow that link)"
            } else {
                if (gfyViews < 2) {
                    o.innerHTML = "Oh noes! We can't reach your gfy!<br>If you <b>just</b> published it, it could be very unusually slow getting out to our content delivery network.  Give it a minute and then try the direct link: <a href='" + gfyMp4Url + "'>here</a>.<br><br>(Now that your browser thinks the file is missing, its not going to cooperate until you follow that link)"
                } else {
                    o.innerHTML = "Oops! We can't reach this gfy. Is your <b>network</b> working? <br><br>We'd love to here from you if there is a problem on our end.  Sorry!<br><br>You can try directly <a href='" + gfyGifUrl + "'>here</a>."
                }
            }
        }
    }

    function I() {
        if (F.playbackRate <= 1) {
            F.playbackRate = F.playbackRate / 2
        } else {
            F.playbackRate--
        }
        bS()
    }

    function ab() {
        if (F.playbackRate <= 1) {
            F.playbackRate = F.playbackRate * 2
        } else {
            F.playbackRate = parseFloat(F.playbackRate) + 1
        }
        bS()
    }

    function bp() {
        if (window.opera) {
            var bV = F.onplay;
            F.onplay = function() {
                F.pause();
                F.onplay = bV
            };
            F.play()
        } else {
            F.currentTime += (1 / gfyFrameRate)
        }
        bS()
    }

    function i() {
        F.currentTime -= (1 / gfyFrameRate);
        bS()
    }

    function bS() {
        if (F.playbackRate <= 1) {
            var bZ = F.playbackRate / 2;
            var bV = F.playbackRate * 2
        } else {
            var bZ = F.playbackRate - 1;
            var bV = F.playbackRate + 1
        }
        var bW = new Array();
        if (!W) {
            bW.format = "gif"
        } else {
            if (bN) {
                bW.direction = "reverse"
            } else {
                if (F.paused) {
                    bW.frameNum = bK()
                }
            }
            if (F.playbackRate != 1) {
                bW.speed = F.playbackRate
            }
        }
        var b0 = "";
        for (var b2 in bW) {
            var b1 = bW[b2];
            b0 += encodeURIComponent(b2) + "=" + encodeURIComponent(b1) + "&"
        }
        if (b0.length > 0) {
            b0 = b0.substring(0, b0.length - 1);
            var bY = "#?" + b0;
            var bX = window.document.URL.toString();
            var b3 = bX.split(".").pop().split("#").shift();
            if (W && b3 == "gif") {
                bX = bX.replace(".gif", "");
                location.replace(bX + bY)
            } else {
                location.replace(bY)
            }
        } else {
            var bX = window.document.URL.toString();
            var b3 = bX.split(".").pop().split("#").shift();
            if (W && b3 == "gif") {
                bX = bX.replace(".gif", "");
                location.replace(bX + "#")
            } else {
                location.replace("#")
            }
        }
    }

    function T() {
        if (bg) {
            return false
        } else {
            isShowOrHideRunning = true
        }
    }

    function w() {
        if (bg) {
            return false
        } else {
            isShowOrHideRunning = true
        }
    }

    function ao() {
        var bV = document.getElementById("mp4source");
        av();
        F.load();
        var bW = navigator.userAgent.toLowerCase();
        if (bW.indexOf("android") > -1) {
            F.loop = false;
            F.addEventListener("load", function() {
                F.play()
            }, false);
            F.addEventListener("ended", function() {
                F.currentTime = -0.5;
                F.play()
            }, false)
        }
        F.play();
        s = 0;
        if (!Y) {
            aH.drawLoadingBeat()
        }
    }

    function P() {
        var bY = gfyParams.getURLParameters("format");
        if (bY == "gif") {
            if (W) {
                bw();
                return
            }
        }
        var bW = gfyParams.getURLParameters("speed");
        var bX = gfyParams.getURLParameters("direction");
        var bV = gfyParams.getURLParameters("frameNum");
        if (bW) {
            F.playbackRate = bW
        }
        if (bX && bX == "reverse") {
            if (!bN) {
                ay()
            }
        }
        if (bV) {
            aT();
            F.currentTime = (bV / gfyFrameRate)
        }
    }
    this.drawLoadingBeat = function() {
        Y = 1;
        var bZ = F.buffered;
        var b3 = F.duration;
        var b1 = 0;
        if (!bt) {
            bt = (new Date).getTime()
        }
        try {
            var bV = bZ.start(0);
            var bW = bZ.end(0);
            var b1 = bW / b3;
            aa.style.display = "none";
            var b4 = bJ.getContext("2d");
            b4.clearRect(0, 0, 50, 50);
            b4.beginPath();
            b4.fillStyle = "#555555";
            b4.arc(16, 16, 14, 0, Math.PI * 2, false);
            b4.lineTo(16, 16);
            b4.closePath();
            b4.fill();
            b4.beginPath();
            b4.fillStyle = "#99cf2c";
            b4.arc(16, 16, 15, 0, Math.PI * b1 * 2, false);
            b4.lineTo(16, 16);
            b4.closePath();
            b4.fill()
        } catch (b0) {
            try {
                c.style.display = "none";
                b4 = bJ.getContext("2d");
                b4.clearRect(0, 0, 100, 100);
                b4.beginPath();
                var bY = s * 15 % 125;
                var b5 = bY + dotRed;
                var bX = bY + dotGreen;
                var b2 = bY + dotBlue;
                b4.fillStyle = "rgb(" + b5 + "," + bX + "," + b2 + ")";
                b4.arc(20, 20, 6, 0, Math.PI * 2, false);
                b4.lineTo(20, 20);
                b4.closePath();
                b4.fill()
            } catch (b0) {}
        }
        if (!(b1 >= 0.98)) {
            setTimeout(function() {
                aH.drawLoadingBeat()
            }, 100)
        } else {
            try {
                s = 0;
                Y = 0;
                bJ.style.display = "none";
                if (W) {
                    c.style.display = "block"
                }
                aa.getContext("2d").clearRect(0, 0, aa.width, aa.height);
                aa.style.display = "none";
                var b4 = v.getContext("2d");
                b4.clearRect(0, 0, 100, 100);
                b4.beginPath();
                b4.fillStyle = "#99cf2c";
                b4.arc(20, 20, 6, 0, Math.PI * b1 * 2, false);
                b4.lineTo(20, 20);
                b4.closePath();
                b4.fill();
                setTimeout(function() {
                    aH.checkGfyExtras()
                }, 1000);
                F.playbackRate = 1;
                P();
                bL()
            } catch (b0) {}
        }
    };

    function bL() {
        gfyWidth = F.getBoundingClientRect().width;
        gfyHeight = F.getBoundingClientRect().height;
        z(gfyWidth, gfyHeight);
        try {
            document.getElementById("closeAdX").style.display = "block"
        } catch (bV) {}
        return;
        if (ae) {} else {}
    }

    function aG() {
        try {
            aa.getContext("2d").clearRect(0, 0, aa.width, aa.height);
            var bV = v.getContext("2d");
            bV.clearRect(0, 0, 50, 50);
            bV.beginPath();
            bV.fillStyle = ai;
            bV.arc(5, 5, 5, 0, Math.PI * 2, false);
            bV.lineTo(5, 5);
            bV.closePath();
            bV.fill()
        } catch (bW) {}
    }
    return {
        init: bM,
        refresh: ao,
        setGfyItem: n,
        setTheme: aR
    }
};
var gfyCounter = function() {
    function a() {
        var d = document.URL;
        var c = /.*\/(.*)/;
        m = c.exec(document.URL);
        d = m[1];
        return d
    }

    function b() {
        if (document.URL.indexOf("account") > -1) {
            return
        }
        if (gfyViews > 100000) {
            if (Math.floor((Math.random() * 1000)) != 500) {
                return
            }
            sr = "3"
        } else {
            if (gfyViews > 10000) {
                if (Math.floor((Math.random() * 100)) != 50) {
                    return
                }
                sr = "2"
            } else {
                if (gfyViews > 1000) {
                    if (Math.floor((Math.random() * 10)) != 5) {
                        return
                    }
                    sr = "1"
                } else {
                    sr = "0"
                }
            }
        }
        var d = a();
        if (d == "account") {
            return
        }
        if (typeof document.referrer != "undefined") {
            var h = encodeURIComponent(document.referrer)
        } else {
            var h = "Unspecified"
        }
        var g = new Date().getTime();
        var c = '{"gfyId":"' + gfyName.toLowerCase() + '","ref":"' + document.referrer + '","label":"' + gfyLabel + '","sr":"' + sr + '","rnd":"' + g + '"}';
        countEnc = encodeURIComponent(c);
        var f = document.createElement("SCRIPT");
        f.src = "http://tracking.gfycat.com/viewCount/" + countEnc;
        document.getElementsByTagName("HEAD")[0].appendChild(f)
    }
    return {
        getPath: a,
        callCounter: b
    }
}();

function jsonpResp(a) {}
gfyCounter.callCounter();
gfyCollection.init();
gfyTheme.setGfyObjects();