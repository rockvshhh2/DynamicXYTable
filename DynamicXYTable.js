
(function($)
    {
        $.fn.DynamicXYTable = function(options)
            {
                var table = document.createElement("table");

                var Y_Datas = options.Y;

                //==== Y 

                var Y_LevelCount = 0;

                for(var i = 0 , m = Y_Datas.length ; i < m ; i++)
                    {
                        var tmp = Get_StairCount(Y_Datas[i] , 1);

                        if(tmp > Y_LevelCount)
                            {
                                Y_LevelCount = tmp;
                            }
                    }

                var Y_Trs = new Array();

                for(var j = 0 ; j < Y_LevelCount ; j++)
                    {
                        Y_Trs.push(document.createElement("tr"));
                    }

                for(var i = 0 ; i < Y_Datas.length ; i++)
                    {
                        var First = Y_Datas[i];

                        var Colspan = 0;

                        if (First.Children) {
                            for (var j = 0 ; j < First.Children.length ; j++) {
                                Colspan += Create_Y(First.Children[j], Y_Trs, 1, Y_LevelCount);
                            }

                            var span_Text = document.createElement("span");
                            span_Text.innerHTML = First.Text;

                            var td = document.createElement("td");
                            td.appendChild(span_Text);
                            td.setAttribute("colspan", Colspan);
                            Y_Trs[0].appendChild(td);

                            First.Colspan = Colspan;
                        }
                        else {

                            var span_Text = document.createElement("span");
                            span_Text.innerHTML = First.Text;

                            var td = document.createElement("td");
                            td.appendChild(span_Text);
                            td.setAttribute("colspan", Colspan);
                            Y_Trs[0].appendChild(td);

                            First.Colspan = Colspan;

                            if (Y_LevelCount > 1) {
                                for (var j = 1 ; j < Y_LevelCount ; j++) {

                                    var td = document.createElement("td");
                                    td.setAttribute("colspan", Colspan);
                                    Y_Trs[j].appendChild(td);
                                }
                            }
                        }
                    }

                var Y_LastTds;

                for(var k = 0 , m = Y_Trs.length ; k < m ; k++)
                    {
                        table.appendChild(Y_Trs[k]);

                        if(k == m - 1)
                            {
                                Y_LastTds = Y_Trs[k].getElementsByTagName("td");
                            }
                    }

                //=== X

                var X_Datas = options.X;

                var X_LevelCount = 0;

                for(var i = 0 , m = X_Datas.length ; i < m ; i++)
                    {
                        var tmp = Get_StairCount(X_Datas[i] , 1);

                        if(tmp > X_LevelCount)
                            {
                                X_LevelCount = tmp;
                            }
                    }

                for(var i = 0 , m = X_Datas.length ; i < m ; i++)
                    {
                        var First = X_Datas[i];

                        var Rowspan = 0;

                        if(First.Children)
                            {
                                var tr;

                                for(var j = 0 , n = First.Children.length ; j < n ; j++)
                                    {
                                        var obj = Create_X(First.Children[j] , table , 1 , X_LevelCount);

                                        if(j == 0)
                                            {
                                                tr = obj.Tr;
                                            }

                                        Rowspan += obj.Rowspan;
                                    }

                                var td = document.createElement("td");
                                td.innerHTML = First.Text;
                                td.rowSpan = Rowspan;
                                $(tr).prepend(td);
                            }
                        else
                            {
                                var tr = document.createElement("tr");
                                table.appendChild(tr);

                                for(var q = 0 ; q < X_LevelCount ; q++)
                                    {
                                        var td = document.createElement("td");

                                        if(q == 0)
                                            {
                                                td.innerHTML = First.Text;
                                            }
                                                                                
                                        $(tr).append(td);
                                    }
                            }
                    }

                //== Content
                var Trs = table.getElementsByTagName("tr");

                for(var l = Y_LevelCount , m = Trs.length ; l < m ; l++)
                    {
                        var tr = Trs[l];

                        var tds = tr.getElementsByTagName("td");

                        var key_1 = tds[tds.length - 1].getAttribute("Key");

                        for(var o = 0 , n = Y_LastTds.length ; o < n ; o++)
                            {
                                var Content_Td = document.createElement("td");
                                Content_Td.setAttribute("id" , "td_" + key_1 + Y_LastTds[o].getAttribute("Key"));

                                Trs[l].appendChild(Content_Td);
                            }
                    }

                if(options.Title)
                    {
                        if($.isArray(options.Title))
                            {
                                for(var p = 0 , m = Y_Trs.length ; p < m ; p++)
                                    {
                                        var title = options.Title[p];
                                        var td = document.createElement("td");
                                        td.colSpan = X_LevelCount;
                                        
                                        if(title)
                                            {
                                                td.innerHTML = title;                                                        
                                            }
                                        
                                        $(Y_Trs[p]).prepend(td);
                                    }
                            }
                        else if(typeof options.Title == "string")
                            {
                                var td = document.createElement("td");
                                td.rowSpan = Y_LevelCount;
                                td.colSpan = X_LevelCount;
                                td.innerHTML = options.Title;

                                $(Y_Trs[0]).prepend(td);
                            }
                    }
                else
                    {
                        var td = document.createElement("td");
                        td.rowSpan = Y_LevelCount;
                        td.colSpan = X_LevelCount;

                        $(Y_Trs[0]).prepend(td);
                    }

                this.append(table);

            };


        function Get_StairCount(Data , Count)
            {
                var Tmp_Count = 0;

                if(Data.Children)
                    {
                        Count++;

                        for(var i = 0 , m = Data.Children.length ; i < m ; i++)
                            {
                                var tmp = Get_StairCount(Data.Children[i] , Count);

                                if(tmp > Tmp_Count)
                                    {
                                        Tmp_Count = tmp;
                                    }
                            }
                    }

                if(Tmp_Count > Count)
                    {
                        return Tmp_Count;
                    }

                return Count;
            }


        function Create_Y(Data , Trs , LevelIndex , LevelCount)
            {
                var Colspan = 0;

                if(Data.Children)
                    {
                        if(Data.Children.length > 0)
                            {
                                for(var i = 0 , m = Data.Children.length ; i < m ; i++)
                                    {
                                        Colspan += Create_Y(Data.Children[i] , Trs , LevelIndex + 1 , LevelCount);
                                    }
                            }
                        else
                            {
                                Colspan++;

                                if(LevelIndex < LevelCount)
                                    {
                                        for(var j = LevelIndex + 1 , m = LevelCount ; j < LevelCount ; j++)
                                            {
                                                var td = document.createElement("td");

                                                if(Data.Key)
                                                    {
                                                        td.id = "td_" + Data.Key;
                                                        td.setAttribute("Key" , Data.Key);
                                                    }

                                                Trs[j].appendChild(td);
                                            }
                                    }
                            }
                    }
                else
                    {
                        Colspan++;

                        if(LevelIndex < LevelCount)
                            {
                                for(var j = LevelIndex + 1 , m = LevelCount ; j < LevelCount ; j++)
                                    {
                                        var td = document.createElement("td");

                                        if(Data.Key)
                                            {
                                                td.id = "td_" + Data.Key;
                                                td.setAttribute("Key" , Data.Key);
                                            }

                                        $(Trs[j]).append(td);
                                    }
                            }
                    }

                var td = document.createElement("td");
                td.innerHTML = Data.Text;
                td.colSpan = Colspan;
                
                if(Data.Key)
                    {
                        td.id = "td_" + Data.Key;
                        td.setAttribute("Key" , Data.Key);
                    }

                Data.Colspan = Colspan;
                Trs[LevelIndex].appendChild(td);

                return Colspan;
            }


        function Create_X(Data , table , LevelIndex , LevelCount)
            {
                var Rowspan = 0;

                if(Data.Children)
                    {
                        if(Data.Children.length > 0)
                            {
                                var tr;

                                for(var i = 0 , m = Data.Children.length ; i < m ; i++)
                                    {
                                        var obj = Create_X(Data.Children[i] , table , LevelIndex + 1 , LevelCount);

                                        if(i == 0)
                                            {
                                                tr = obj.Tr;
                                            }

                                        Rowspan += obj.Rowspan;
                                    }

                                var td = document.createElement("td");
                                td.innerHTML = Data.Text;
                                td.rowSpan = Rowspan;

                                if(Data.Key)
                                    {
                                        td.id = "td_" + Data.Key;
                                        td.setAttribute("Key" , Data.Key);
                                    }

                                $(tr).prepend(td);

                                return { Rowspan: Rowspan , Tr: tr };
                            }
                        else
                            {
                                Rowspan++;

                                var tr = document.createElement("tr");
                                table.appendChild(tr);

                                var td = document.createElement("td");
                                tr.appendChild(td);
                                td.innerHTML = Data.Text;

                                if(Data.Key)
                                    {
                                        td.id = "td_" + Data.Key;
                                        td.setAttribute("Key" , Data.Key);
                                    }

                                if(LevelIndex < LevelCount)
                                    {
                                        for(var j = LevelIndex + 1 , m = LevelCount ; j < LevelCount ; j++)
                                            {
                                                var td = document.createElement("td");

                                                if(Data.Key)
                                                    {
                                                        td.id = "td_" + Data.Key;
                                                        td.setAttribute("Key" , Data.Key);
                                                    }

                                                tr.appendChild(td);
                                            }
                                    }

                                return { Rowspan: Rowspan , Tr: tr };
                            }
                    }
                else
                    {
                        Rowspan++;

                        var tr = document.createElement("tr");
                        table.appendChild(tr);

                        var td = document.createElement("td");
                        tr.appendChild(td);
                        td.innerHTML = Data.Text;

                        if(Data.Key)
                            {
                                td.id = "td_" + Data.Key;
                                td.setAttribute("Key" , Data.Key);
                            }

                        if(LevelIndex < LevelCount)
                            {
                                for(var j = LevelIndex + 1 , m = LevelCount ; j < LevelCount ; j++)
                                    {
                                        var td = document.createElement("td");

                                        if(Data.Key)
                                            {
                                                td.id = "td_" + Data.Key;
                                                td.setAttribute("Key" , Data.Key);
                                            }

                                        tr.appendChild(td);
                                    }
                            }

                        return { Rowspan: Rowspan , Tr: tr };

                    }
            }

    })(jQuery)