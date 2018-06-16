
    (function (win) {
        win.component = {
            selectbox:function (id) {
                this.selectBox = document.querySelector('#'+id);
                this.selectBox.innerHTML = '<input type="text" autocomplete="off" placeholder="输入姓名"    class="select-input" id="value"><span class="open-icon"></span><div id="listBox" class="close"></div>'
                ;

                this.values = document.querySelector('#value');
                this.listBox = document.querySelector('#listBox');
                this.openIon = document.querySelector('.open-icon');
                this.storage = win.localStorage;
                this.isopen = false;

                this.values.addEventListener('focus', this.open.bind(this));
                this.values.addEventListener('blur',this.close.bind(this));

                this.selectBox.addEventListener('click', (e) => {
                    if(this.isopen) return;
                    this.values.focus();
                })

                this.listBox.addEventListener('click', (e) => {
                    this.values.value = e.target.innerText;
                })

                this.values.addEventListener('keyup', (e) => {
                    let val = e.target.value;
                    let list = document.querySelectorAll('#listBox .item');
                    list.forEach(itme => {
                        let str = itme.innerText;
                        let reg = new RegExp(val);
                        if (str.match(reg) && val) {
                            itme.style.color = "red"
                        } else {
                            itme.style.color = "#cecece"
                        }
                    });
                })
            },
            open:function(){
                this.isopen = true;
                this.listBox.className = 'open';
                this.openIon.className = 'open-icon open-icon-down';
                this.selectBox.className = 'selectFocus'
                this.listBox.innerHTML = '';
                let pr = new Promise((res, rej) => {
                    let datas;
                    try {
                        datas = this.storage.getItem('contacts')
                    } catch (error) {
                        rej(error)
                    }
                    //异步假装请求远程服务
                    res(datas);
                })

                pr.then((res) => {
                    res = JSON.parse(res);
                    let docfrag = document.createDocumentFragment();

                    res.forEach(item => {
                        let div = document.createElement('div');
                        div.className = 'item';
                        div.innerText = item.value;
                        docfrag.appendChild(div);
                    });

                    listBox.appendChild(docfrag);
                }).catch((err) => {
                    console.error('can not get data' + err);
                })

            },
            close:function(){
                this.selectBox.className = 'selectBlur'
                setTimeout(()=>{
                    this.isopen = false;
                },100)
                this.listBox.className = 'close';
                this.openIon.className = 'open-icon';
            }
        }
    })(window)

    var listData = [
        { value: '李耀' },
        { value: '李一' },
        { value: '李二' },
        { value: '王耀' },
        { value: '刘长' },
        { value: '郭唱' },
        { value: '徐志' },
        { value: '李耀' },
        { value: '王浙全' },
        { value: '胡有才' },
        { value: '朱元璋' },
        { value: '达摩' },
        { value: '刘浏' },
        { value: '黄卡' },
        { value: '周康永' },
        { value: '赵彭阳' },
        { value: '彭格' }
    ]

window.onload = function () {
    let storage = window.localStorage;
    //加载数据
    storage.setItem('contacts', JSON.stringify(listData));
    //调用插件
    component.selectbox('selectBox');
}

