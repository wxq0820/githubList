$(function () {
    // $('.menu-tab').on('click', function () {
    //     var index = $(this).index()
    //     $(this).addClass('active').siblings().removeClass('active')
    //     $('.details-tab').eq(index).addClass('active').siblings().removeClass('active')
    // })

    // var pageIdx = 1
    // var listIndex = 1;
    // var isLoading

    // start()

    // function start() {
    //     $('.loading').show(400)
    //     $.ajax({
    //         url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&page=' + pageIdx,
    //         method: 'GET',
    //         dataType: 'jsonp',
    //     }).done(function (ret) {
    //         setData(ret)
    //         pageIdx++
    //     }).fail(function () {
    //         console.log('失败。。')
    //     }).always(function () {
    //         $('.loading').hide(400)
    //     })
    // }

    // $('.contains').on('scroll', function () {
    //     if (isLoading) {
    //         clearTimeout(isLoading)
    //     }
    //     isLoading = setTimeout(function () {
    //         if ($('.contains').height() + $('.contains').scrollTop() + 30 > $('section').eq(0).height()) {
    //             start()
    //         }
    //     }, 300)
    // })

    // function setData(list) {
    //     list.data.items.forEach(function (project) {
    //         var html = `<a class="main-list" href="javaScript:void(0);">
    //         <span class="index"></span>
    //         <div>
    //             <h2 class="title"></h2>
    //             <p class="detail"></p>
    //             <div class="star">
    //                 <span class="star-num"></span>
    //                 <span> star</span>
    //             </div>
    //         </div>
    //     </a>`
    //         var $node = $(html)
    //         $node.find('.index').text(listIndex)
    //         $node.find('.title').text(project.name)
    //         $node.find('.detail').text(project.description)
    //         $node.find('.star').text(project.watchers)
    //         $('.project-content').append($node)
    //         listIndex++
    //     });
    // }

    var paging = {
        init: function () {
            this.$tab = $('.menu-tab'),
                this.$panels = $('.details-tab'),
                this.bind()
        },
        bind: function () {
            var that = this
            this.$tab.on('click', function () {
                var index = $(this).index()
                $(this).addClass('active')
                    .siblings()
                    .removeClass('active')
                that.$panels.eq(index)
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
            })
        }
    }

    var helper = {
        isToBottom: function ($contains, $content) {
            return $contains.height() + $contains.scrollTop() + 30 > $content.eq(0).height()
        }
    }

    var project = {
        init: function () {
            var that = this
            this.page = 1
            this.count = 30
            this.listIndex = 1
            this.isLoading = false
            this.isFinished = false
            this.$contains = $('.project-tab')
            this.$content = this.$contains.find('.project-content')
            this.getData(function (list) {
                that.render(list)
                that.page++
            })
            this.bind()
        },
        bind: function () {
            var that = this
            this.$contains.on('scroll', function () {
                if (helper.isToBottom(that.$contains, that.$content) && !that.isLoading && !that.isFinished) {
                    that.getData(function (list) {
                        that.render(list)
                        if (that.page * that.count > list.data.total_count) {
                            that.isFinished = true
                        }
                        that.page++
                    })
                }
            })
        },
        getData: function (callback) {
            var that = this
            this.isLoading = true
            this.$contains.find('.loading').show(400)
            $.ajax({
                url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    page: this.page
                }
            }).done(function (ret) {
                that.$contains.find('.loading').hide(400)
                callback(ret)
                that.isLoading = false
            })
        },
        render: function (list) {
            var that = this
            list.data.items.forEach(function (project) {
                var html = `<a class="main-list" href="#">
                                <span class="index"></span>
                                <div>
                                    <h2 class="title"></h2>
                                    <p class="detail"></p>
                                    <div class="star">
                                        <span class="star-num"></span>
                                        <span> star</span>
                                    </div>
                                </div>
                            </a>`
                var $node = $(html)
                $node.find('.index').text(that.listIndex)
                $node.find('a').prevObject.attr('href', project.html_url)
                $node.find('.title').text(project.name)
                $node.find('.detail').text(project.description)
                $node.find('.star-num').text(project.watchers)
                that.$content.append($node)
                that.listIndex++
            });
        }
    }

    var follower = {
        init: function () {
            var that = this
            this.page = 1
            this.count = 30
            this.isLoading = false
            this.isFinished = false
            this.$contains = $('.followers-tab')
            this.$content = this.$contains.find('.followers-content')
            this.getData(function (list) {
                that.render(list)
                that.page++
            })
            this.bind()
        },
        bind: function () {
            var that = this
            this.$contains.on('scroll', function () {
                if (helper.isToBottom(that.$contains, that.$content) && !that.isLoading && !that.isFinished) {
                    that.getData(function (list) {
                        that.render(list)
                        if (that.page * that.count > list.data.total_count) {
                            that.isFinished = true
                        }
                        that.page++
                    })
                }
            })
        },
        getData: function (callback) {
            var that = this
            this.isLoading = true
            this.$contains.find('.loading').show(400)
            $.ajax({
                url: 'https://api.github.com/search/users?q=followers:>1000+language:javascript',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    page: this.page
                }
            }).done(function (ret) {
                that.$contains.find('.loading').hide(400)
                callback(ret)
                that.isLoading = false
            })
        },
        render: function (list) {
            var that = this
            list.data.items.forEach(function (project) {
                var $node = $(`<a class="main-list" href="">
                <div class='cover'>
                    <img src="">
                </div>
                <div class='user-name'>
                    <h2 class="title"></h2>
                </div>
            </a>`)

                $node.find('.main-list').prevObject.attr('href', project.html_url)
                $node.find('.cover img').attr('src', project.avatar_url)
                $node.find('.title').text(project.login)
                that.$content.append($node)
            });
        }
    }

    var search = {
        init: function () {
            this.page = 1
            this.count = 30
            this.listIndex = 1
            this.scrollHeight = 0
            this.isLoading = false
            this.isFinished = false
            this.$contains = $('.search-tab')
            this.$content = this.$contains.find('.result-content')
            this.bind()
        },
        bind: function () {
            var that = this
            this.$contains.find('.search-content .search-btn').on('click', function () {
                that.$content.text('')
                that.listIndex = 1
                that.getData(function (list) {
                    that.render(list)
                    console.log('search end')
                })
            })
            this.$contains.find('.search-content input').on('keyup', function (e) {
                if (e.key === 'Enter') {
                    that.$content.text('')
                    that.listIndex = 1
                    that.getData(function (list) {
                        that.render(list)
                    })
                }
            })
            this.$contains.on('scroll', function () {
                if (helper.isToBottom(that.$contains, that.$content) && !that.isLoading && !that.isFinished) {
                    that.page++
                    that.getData(function (list) {
                        that.render(list)
                        if (that.page * that.count > list.data.total_count) {
                            that.isFinished = true
                        }
                    })
                }
            })
        },
        getData: function (callback) {
            var that = this
            var keyword = this.$contains.find('.search-content input').val()
            console.log(keyword)
            this.isLoading = true
            this.$contains.find('.loading').show(400)
            $.ajax({
                url: 'https://api.github.com/search/repositories?q=' + keyword + '+language:javascript&sort=stars&order=desc',
                method: 'GET',
                dataType: 'jsonp',
                data: {
                    page: this.page
                }
            }).done(function (ret) {
                console.log(ret)
                that.$contains.find('.loading').hide(400)
                callback(ret)
                that.isLoading = false
            })
        }, render: function (list) {
            var that = this
            list.data.items.forEach(function (project) {
                var html = `<a class="main-list" href="#">
                                <span class="index"></span>
                                <div>
                                    <h2 class="title"></h2>
                                    <p class="detail"></p>
                                    <div class="star">
                                        <span class="star-num"></span>
                                        <span> star</span>
                                    </div>
                                </div>
                            </a>`
                var $node = $(html)
                $node.find('.index').text(that.listIndex)
                $node.find('a').prevObject.attr('href', project.html_url)
                $node.find('.title').text(project.name)
                $node.find('.detail').text(project.description)
                $node.find('.star-num').text(project.watchers)
                that.$content.append($node)
                that.listIndex++
            });
        }
    }

    var app = {
        init: function () {
            paging.init(),
                project.init(),
                follower.init(),
                search.init()
        }
    }

    app.init()

})

